import { BrowserRouter } from "react-router-dom";
import { Provider } from "./components/ui/provider";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Auth0ProviderWithNavigate from "./context/Auth0ProviderWithNavigate";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate
        domain="https://dev-u87o2pzw50n6mif5.us.auth0.com"
        clientId="nb0YBpMx3RNvEdDEnPPfS661V2wqvy96"
        redirectUri="http://localhost:5173/callback"
        audience="https://mern-store-api"
      >
        <AuthProvider>
          <Provider>
            <App />
          </Provider>
        </AuthProvider>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </StrictMode>
);
