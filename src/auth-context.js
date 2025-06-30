import { createContext, useContext } from "react";

const AuthContext = createContext({
  token: "",
  onLogin: async () => {},
  onLogout: async () => {},
  onRefreshAccessToken: async () => {},
});

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthContext, useAuth };
