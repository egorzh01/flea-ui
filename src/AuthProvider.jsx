import { useEffect, useState } from "react";
import { AuthContext, useAuth } from "./auth-context";
import { Navigate, useLocation, useNavigate } from "react-router";
import { setAccessTokenGetter, setRefreshAccessToken } from "./api";
import axios from "axios";

const authAPI = axios.create({
  baseURL: "http://localhost:8000/api/auth",
});

let refreshPromise = null;

function AuthProvider({ children }) {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const refreshAccessToken = async () => {
    if (refreshPromise) {
      return refreshPromise;
    }

    refreshPromise = (async () => {
      try {
        const res = await authAPI.post(
          "/refresh_token/",
          {},
          {
            headers: {
              "X-CSRF-Token": document.cookie?.match(
                /flea_csrf_token=([^;]+)/,
              )?.[1],
            },
            withCredentials: true,
          },
        );

        setToken(res.data.access_token);
        return res;
      } catch (err) {
        if (err.response?.status === 401) {
          setToken("");
        } else {
          console.warn("Not authenticated:", err);
        }
        throw err;
      } finally {
        refreshPromise = null;
        setLoading(false);
      }
    })();

    return refreshPromise;
  };

  useEffect(() => {
    setAccessTokenGetter(() => token);
  }, [token]);

  useEffect(() => {
    if (token && location.pathname === "/auth") {
      navigate("/", { replace: true });
    }
  }, [token, location.pathname, navigate]);

  useEffect(() => {
    refreshAccessToken();
    setRefreshAccessToken(refreshAccessToken);
  }, []);

  const handleLogin = async (username, password) => {
    if (!username || !password) return;

    const res = await authAPI.post(
      "/login/",
      {
        username: username,
        password: password,
      },
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
    );
    setToken(res.data.access_token);
    const origin = location.state?.from?.pathname || "/";
    navigate(origin);
  };

  async function handleLogout() {
    try {
      await authAPI.delete("/refresh_token/", {
        headers: {
          "X-CSRF-Token": document.cookie?.match(
            /flea_csrf_token=([^;]+)/,
          )?.[1],
        },
        withCredentials: true,
      });
      setToken("");
    } catch (err) {
      if (err.response.status === 401) {
        setToken("");
      }
      console.warn(err);
    }
  }

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onRefreshAccessToken: refreshAccessToken,
  };
  if (loading) return <div>Loading auth...</div>;
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
