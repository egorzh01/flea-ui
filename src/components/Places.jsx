import { Link, NavLink } from "react-router";
export default function Places() {
  let current = { uid: 2, name: "Kitchen", parent: { uid: 1, name: "House" } };
  // let current = null;
  let places = [
    { uid: 3, name: "Refrigerator" },
    { uid: 4, name: "Pantry" },
    { uid: 5, name: "Cupboard" },
    { uid: 6, name: "Drawer" },
    { uid: 7, name: "Oven" },
    { uid: 8, name: "Sink Cabinet" },
    { uid: 9, name: "Spice Rack" },
    { uid: 10, name: "Dish Rack" },
    { uid: 11, name: "Microwave Shelf" },
    { uid: 12, name: "Freezer" },
    { uid: 13, name: "Utensil Holder" },
    { uid: 14, name: "Trash Bin Area" },
    { uid: 15, name: "Recycling Bin Area" },
    { uid: 16, name: "Coffee Station" },
    { uid: 17, name: "Breakfast Nook" },
    { uid: 18, name: "Bar Cabinet" },
  ];
  // let places = [];

  return (
    <div className="flex h-screen flex-col py-50">
      <div className="absolute top-12 left-1/2 flex -translate-x-1/2 flex-col items-center">
        {current && current.parent && (
          <Link
            to={`/places/${current && current.parent.uid}`}
            className="text-sm text-gray-400 duration-200 hover:scale-130 hover:text-[var(--dark)] dark:hover:text-[var(--light)]"
          >
            {current && current.parent.name}
          </Link>
        )}
        <div className="relative flex items-center gap-5 overflow-hidden">
          <NavLink
            to="/places"
            className="group flex w-10 flex-col items-center rounded py-4"
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
          <h1 className="flex text-3xl">
            {current ? current.name : "All places"}
          </h1>
          <NavLink
            to="/items"
            className="group flex w-10 flex-col items-center rounded py-4"
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
        </div>
        <span className="cursor-pointer text-sm text-gray-400 duration-200 hover:scale-200 hover:text-[var(--dark)] dark:hover:text-[var(--light)]">
          +
        </span>
      </div>

      {places.length === 0 ? (
        <span className="m-auto text-gray-400">No children</span>
      ) : (
        <div className="scrollarea m-auto flex w-2/3 flex-wrap justify-center gap-3 overflow-y-auto">
          {places.map((place, index) => (
            <div
              key={index}
              className="flex h-fit w-fit cursor-pointer flex-col items-center rounded-xl border p-3"
            >
              <span>{place.name}</span>
              <div className="relative flex min-w-25 justify-center gap-3 overflow-hidden">
                <Link
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
                      d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"
                    />
                  </svg>
                  <span className="absolute top-full text-xs duration-200 group-hover:-translate-y-5">
                    Places
                  </span>
                </Link>
                <Link
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
                      d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                    />
                  </svg>
                  <span className="absolute top-full text-xs duration-200 group-hover:-translate-y-5">
                    Items
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
