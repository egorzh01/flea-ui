import { createContext, useContext } from "react";

const AuthContext = createContext({
  token: "",
  onLogin: () => {},
  onLogout: () => {},
});

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthContext, useAuth };
