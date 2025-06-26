import { NavLink } from "react-router";
import { useAuth } from "../auth-context";

const Navigation = () => {
  const { onLogout } = useAuth();

  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/admin">Admin</NavLink>

      <button type="button" onClick={onLogout}>
        Sign Out
      </button>
    </nav>
  );
};

export default Navigation;
