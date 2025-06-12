import { permit } from '../server.js'; // Import the initialized permit instance

// Function to sync user from Auth0 to Permit.io
export const syncUser = async (user) => {
    if (!user || !user.sub) return;
    try {
        // Prepare user data for Permit.io
        const userData = {
            key: user.sub, // Unique user key (Auth0 user ID)
            email: user.email,
            firstName: user.given_name || user.name || '',
            lastName: user.family_name || '',
            // Add more fields as needed
        };
        // Upsert user in Permit.io
        await permit.api.users.sync(userData);
        // Optionally, you can log or handle the response
    } catch (error) {
        console.error('Error syncing user to Permit.io:', error);
        // Optionally, handle error (e.g., throw or continue)
    }
};

// Higher-order function to create a permission-checking middleware
export const checkPermissions = (action, resourceType) => {
    return async (req, res, next) => {
        if (!req.user || !req.user.sub) {
            // This should ideally be caught by the Auth0 authentication middleware first,
            // but this acts as a safeguard.
            return res.status(401).json({ message: 'Authentication required. User context not found.' });
        }

        const userKey = req.user.sub; // User's unique key (e.g., from Auth0's sub claim)
        // const tenant = req.user.org_id || 'default'; // Example: Tenant might come from user's organization or a default

        // Sync user to Permit.io before checking permissions
        await syncUser(req.user);

        // Construct the resource object for Permit.io
        // The `key` for the resource can be dynamic, e.g., an ID from request parameters for specific item checks.
        const resource = {
            type: resourceType,
            // key: req.params.id, // Example: If checking for a specific item like a product by ID. You'd get 'id' from route params.
            // tenant: tenant // Pass tenant if using multi-tenancy
        };

        try {
            // Basic logging for the permission check attempt
            console.log(`PERMISSION_CHECK: User '${userKey}' attempting action '${action}' on resource type '${resourceType}'${req.params.id ? ` (ID: ${req.params.id})` : ''}.`);
            
            const permitted = await permit.check(
                userKey,      // The user object (or user key)
                action,       // The action the user is trying to perform
                resource      // The resource object (including type, optionally key and tenant)
            );

            if (permitted) {
                console.log(`PERMISSION_GRANTED: User '${userKey}' for action '${action}' on resource type '${resourceType}'.`);
                next(); // User has permission, proceed to the next handler
            } else {
                console.warn(`PERMISSION_DENIED: User '${userKey}' for action '${action}' on resource type '${resourceType}'.`);
                return res.status(403).json({ message: 'Access Denied: You do not have permission to perform this action.' });
            }
        } catch (error) {
            console.error(`PERMIT_SDK_ERROR: Error during permission check for user '${userKey}', action '${action}', resource type '${resourceType}':`, error);
            // Log more details if the error object has them (e.g., from an HTTP request error)
            if (error.response && error.response.data) {
                console.error('PERMIT_SDK_ERROR_DETAILS:', error.response.data);
            }
            return res.status(500).json({ message: 'An error occurred while checking permissions.' });
        }
    };
};

// If you intend to have other authorization related functions here, you can export them individually.
// For now, checkPermissions is the main export. If it's the only one, a default export is also an option:
// export default checkPermissions; 
// However, named exports are generally clearer if you might add more exports later.