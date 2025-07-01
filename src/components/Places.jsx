import { Link } from "react-router";
export default function Places() {
  let parent = { uid: 1, name: "House" };
  let current = { uid: 2, name: "Kitchen" };
  let places = [{ name: "Closet" }]; // или например [{ name: "Garage" }];
  let items = [{ name: "Fridge" }];

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {parent && (
        <Link
          to={`/places/${parent.uid}`}
          className=" absolute top-8 left-1/2 -translate-x-1/2 flex items-center text-sm"
        >
          <span>{parent.name}</span>
        </Link>
      )}
      <h1 className="absolute top-12 left-1/2 z-50 flex -translate-x-1/2 text-3xl">
        {current.name}
      </h1>

      {places.length === 0 ? (
        <p className="flex cursor-pointer gap-3 text-gray-500 hover:text-[var(--dark)] dark:hover:text-[var(--light)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <span>Add place</span>
        </p>
      ) : (
        <div className="flex items-center gap-3">
          <div className="flex gap-3">
            <div className="flex h-170 w-150 flex-col rounded-md border p-5">
              <h2 className="self-center text-xl">Places</h2>
              {places ? (
                places.map((place, index) => (
                  <div key={index} className="text-black">
                    {place.name}
                  </div>
                ))
              ) : (
                <p>No places</p>
              )}
            </div>
            <div className="flex h-170 w-150 flex-col rounded-md border p-5">
              <h2 className="self-center text-xl">Items</h2>
              {items ? (
                items.map((item, index) => (
                  <div key={index} className="text-black">
                    {item.name}
                  </div>
                ))
              ) : (
                <p>No items</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
