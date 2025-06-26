import { useState } from "react";
import { AuthContext, useAuth } from "./auth-context";
import { Navigate, useLocation, useNavigate } from "react-router";

const fakeAuth = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve("2342f2f1d131rf12"), 250);
  });

function AuthProvider({ children }) {
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogin = async () => {
    const token = await fakeAuth();
    setToken(token);
    const origin = location.state?.from?.pathname || "/dashboard";
    navigate(origin);
  };

  const handleLogout = () => {
    setToken("");
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();
  if (!token) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }
  return children;
};

export { AuthProvider, ProtectedRoute };
