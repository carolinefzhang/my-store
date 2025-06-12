import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Callback = () => {
  const { isAuthenticated, isLoading, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    if (error) {
      console.error("Authentication error:", error);
    } else if (isAuthenticated) {
      navigate("/"); // Redirect to protected page after login
    } else {
      navigate("/login"); // Redirect to login page if not authenticated
    }
  }, [isAuthenticated, isLoading, error, navigate]);

  return <div>Loading...</div>;
};

export default Callback;
