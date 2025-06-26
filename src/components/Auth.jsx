import { useAuth } from "../auth-context";
import "./Auth.css";

export default function Auth() {
  const { onLogin } = useAuth();

  return (
    <main className="auth-page">
      <img src="/flea-logo-without-bg.png" alt="logo" className="auth-logo" />
      <div className="auth-box">
        <div className="auth-field">
          <label htmlFor="emailInput" className="auth-label">
            Email
          </label>
          <input id="emailInput" type="email" placeholder="Email" className="auth-input" />
        </div>
        <div className="auth-field">
          <label htmlFor="passwordInput" className="auth-label">
            Password
          </label>
          <input id="passwordInput" type="password" className="auth-input" />
        </div>
        <button type="button" onClick={onLogin} className="auth-button login">
          Login
        </button>
      </div>
    </main>
  );
}
