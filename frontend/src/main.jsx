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
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        redirectUri={import.meta.env.VITE_AUTH0_REDIRECT_URI}
        audience={import.meta.env.VITE_AUTH0_AUDIENCE}
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
