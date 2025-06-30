import { useAuth } from "../auth-context";
import { useState } from "react";

export default function Auth() {
  const { onLogin } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError(""); // очистка предыдущей ошибки
    try {
      await onLogin(username, password);
    } catch (err) {
      setError(
        err?.response?.data?.detail?.code === "INVALID_CREDENTIALS"
          ? "Invalid email or password"
          : err.message,
      );
    }
  };

  return (
    <main className="flex h-full translate-y-1/3 flex-col items-center justify-center gap-8 text-sm">
      <img src="/flea-logo-without-bg.png" alt="logo" className="h-40" />
      <div className="flex min-w-80 flex-col items-center gap-4 rounded-md p-8">
        <div className="flex w-full flex-col">
          <input
            id="emailInput"
            type="email"
            placeholder="Email"
            className="rounded-md border border-[var(--dark)] p-2 dark:border-[var(--light)]"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="relative flex w-full flex-col">
          <input
            id="passwordInput"
            type="password"
            placeholder="Password"
            className="rounded-md border border-[var(--dark)] p-2 dark:border-[var(--light)]"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!password && (
            <button className="absolute top-1/2 right-3 -translate-y-1/2 text-blue-400 hover:underline">
              Forgot?
            </button>
          )}
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full cursor-pointer rounded-md bg-[var(--dark)] p-2 font-medium text-[var(--light)] dark:bg-[var(--light)] dark:text-[var(--dark)]"
        >
          Login
        </button>
      </div>
    </main>
  );
}
