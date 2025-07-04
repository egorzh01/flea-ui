import { NavLink } from "react-router";
import { useAuth } from "../auth-context";

const Navigation = () => {
  const { onLogout } = useAuth();
  return (
    <nav className="absolute bottom-12 left-1/2 z-50 flex -translate-x-1/2 gap-7 overflow-hidden rounded-2xl border px-4">
      <div className="flex gap-3">
        <NavLink
          to="/"
          className="group flex flex-col items-center rounded py-4"
        >
          {({ isActive }) => (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`size-6 transition-all duration-300 group-hover:-translate-y-2 ${
                  isActive
                    ? "text-[var(--dark)] dark:text-[var(--light)]"
                    : "text-gray-400 group-hover:text-[var(--dark)] dark:group-hover:text-[var(--light)]"
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              <span
                aria-hidden
                className="absolute top-full text-xs duration-200 group-hover:-translate-y-5"
              >
                Home
              </span>
            </>
          )}
        </NavLink>
        <NavLink
          to="/places"
          className="group flex flex-col items-center rounded py-4"
        >
          {({ isActive }) => (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`size-6 transition-all duration-300 group-hover:-translate-y-2 ${
                  isActive
                    ? "text-[var(--dark)] dark:text-[var(--light)]"
                    : "text-gray-400 group-hover:text-[var(--dark)] dark:group-hover:text-[var(--light)]"
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"
                />
              </svg>
              <span className="absolute top-full text-xs duration-200 group-hover:-translate-y-5">
                Places
              </span>
            </>
          )}
        </NavLink>
        <NavLink
          to="/items"
          className="group flex flex-col items-center rounded py-4"
        >
          {({ isActive }) => (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`size-6 transition-all duration-300 group-hover:-translate-y-2 ${
                  isActive
                    ? "text-[var(--dark)] dark:text-[var(--light)]"
                    : "text-gray-400 group-hover:text-[var(--dark)] dark:group-hover:text-[var(--light)]"
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                />
              </svg>
              <span className="absolute top-full text-xs duration-200 group-hover:-translate-y-5">
                Items
              </span>
            </>
          )}
        </NavLink>
        <NavLink
          to="/market"
          className="group flex flex-col items-center rounded py-4"
        >
          {({ isActive }) => (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`size-6 transition-all duration-300 group-hover:-translate-y-2 ${
                  isActive
                    ? "text-[var(--dark)] dark:text-[var(--light)]"
                    : "text-gray-400 group-hover:text-[var(--dark)] dark:group-hover:text-[var(--light)]"
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                />
              </svg>

              <span className="absolute top-full text-xs duration-200 group-hover:-translate-y-5">
                Market
              </span>
            </>
          )}
        </NavLink>
      </div>
      <div className="flex gap-3">
        <NavLink
          onClick={onLogout}
          // to="/profile"
          className="group flex flex-col items-center rounded py-4"
        >
          {({ isActive }) => (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`size-6 transition-all duration-300 group-hover:-translate-y-2 ${
                  isActive
                    ? "text-[var(--dark)] dark:text-[var(--light)]"
                    : "text-gray-400 group-hover:text-[var(--dark)] dark:group-hover:text-[var(--light)]"
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              <span className="absolute top-full text-xs duration-200 group-hover:-translate-y-5">
                Profile
              </span>
            </>
          )}
        </NavLink>
        <NavLink
          to="/settings"
          className="group flex flex-col items-center rounded py-4"
        >
          {({ isActive }) => (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`size-6 transition-all duration-300 group-hover:-translate-y-2 ${
                  isActive
                    ? "text-[var(--dark)] dark:text-[var(--light)]"
                    : "text-gray-400 group-hover:text-[var(--dark)] dark:group-hover:text-[var(--light)]"
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>

              <span className="absolute top-full text-xs duration-200 group-hover:-translate-y-5">
                Settings
              </span>
            </>
          )}
        </NavLink>
      </div>
      <div className="flex gap-3">
        <NavLink
          to="/items"
          className="group flex flex-col items-center rounded py-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-gray-400 transition-all duration-300 group-hover:-translate-y-2 group-hover:text-[var(--dark)] dark:group-hover:text-[var(--light)]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>

          <span className="absolute top-full text-xs duration-200 group-hover:-translate-y-5">
            Add
          </span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
