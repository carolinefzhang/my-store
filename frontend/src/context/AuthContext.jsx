import { createContext, useContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

// Create Auth Context
const AuthContext = createContext(undefined);

// Auth Provider
export const AuthProvider = ({ children }) => {
  const {
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    isLoading,
    getIdTokenClaims,
    getAccessTokenSilently,
    error,
  } = useAuth0();
  const [idToken, setIdToken] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const fetchTokens = async () => {
      if (isAuthenticated) {
        try {
          if (!accessToken) {
            const token = await getAccessTokenSilently({
              audience: "https://mern-store-api",
            });
            setAccessToken(token);

            const claims = await getIdTokenClaims();
            setIdToken(claims?.__raw ?? null);
            console.log("ID Token fetched in AuthContext:", claims?.__raw ? 'Yes' : 'No');
            console.log("Access Token fetched in AuthContext:", token ? 'Yes' : 'No');
          }
        } catch (error) {
          console.error("Error getting tokens in AuthContext:", error);
          setAccessToken(null);
          setIdToken(null);
        }
      } else if (!isAuthenticated) {
        setAccessToken(null);
        setIdToken(null);
      }
    };
    fetchTokens();
  }, [isAuthenticated, getAccessTokenSilently, getIdTokenClaims, accessToken]);

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin + "/logout_success",
      },
    });
    setAccessToken(null);
    setIdToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        idToken,
        accessToken,
        isAuthenticated,
        isLoading,
        error,
        login: loginWithRedirect,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use Auth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
