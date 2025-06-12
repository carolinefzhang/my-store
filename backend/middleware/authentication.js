import { config } from 'dotenv';

import pkg from 'jsonwebtoken';

import jwksRsa from 'jwks-rsa';    

// Correctly assign the imported module directly, as its methods are on the root object
const jwt = pkg;
config();

// Middleware to verify Auth0 JWT token
const authentication = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];  // Extract Bearer token
    const client = jwksRsa({
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 10
      });
      const getKey = (header, callback) => {
        client.getSigningKey(header.kid, (err, key) => {
            if (err) {
              return callback(err);
            }
            const signingKey = key.getPublicKey();
            callback(null, signingKey);
          });
      };

    if (!token) {
        return res.status(403).send("Token required");
    }

    jwt.verify(token, getKey, (err, decoded) => {
        if (err) {
            return res.status(401).send('Invalid or expired token');
        }
        req.user = decoded;  // Store decoded user data in request object
        next();
    });
};


// Authentication Middleware
// const authentication = (req, res, next) => { 
//     verifyAuth0Token  
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if (token == null) return res.sendStatus(401);

//     jwt.verify(token, getKey,
//         {
//           audience: process.env.AUTH0_AUDIENCE,
//           issuer: `https://${process.env.AUTH0_DOMAIN}/`,
//           algorithms: ['RS256'],
//         }, (err, user) => {
//         if (err) return res.sendStatus(403);
//         req.user = user;
//         next();
//     });
// };

export default authentication;