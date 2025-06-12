import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { AuthProvider } from "./AuthContext";


const Auth0ProviderWithNavigate = ({
  domain,
  clientId,
  redirectUri,
  children,
}) => {
  if (!(domain && clientId && redirectUri)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: "https://mern-store-api",
        scope: "openid email profile",
        response_type: "token id_token",
      }}
    >
      <AuthProvider>{children}</AuthProvider>
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
