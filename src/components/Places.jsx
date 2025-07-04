import { Link, NavLink, useNavigate, useParams } from "react-router";
import { useCallback, useEffect, useState } from "react";
import axios from "../api";
import Modal from "./Modal";
import Loading from "./Loading";

function PlaceCard({ place }) {
  return (
    <Link
      to={`/places/${place.uid}`}
      className="flex h-fit w-fit flex-col items-center rounded-xl border p-3 hover:bg-[var(--dark)] hover:text-[var(--light)] dark:hover:bg-[var(--light)] dark:hover:text-[var(--dark)]"
    >
      <span>{place.name}</span>
    </Link>
  );
}

function CreatePlaceModal({ isOpen, onClose, onCreate, parent }) {
  const [placeName, setPlaceName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!placeName) {
      setError("Place name is required");
      return;
    }

    setError("");
    try {
      await onCreate({ name: placeName, parent_uid: parent?.uid || null });
      setPlaceName("");
      onClose();
    } catch (err) {
      const msg = err?.response?.data?.detail || "Something went wrong";
      setError(msg);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setError("");
        setPlaceName("");
      }}
    >
      <h2 className="text-md mb-4 wrap-anywhere">
        New place in {parent?.name || "root"}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-sm">
        <input
          type="text"
          placeholder="Name"
          name="name"
          minLength={1}
          maxLength={64}
          value={placeName}
          onChange={(e) => setPlaceName(e.target.value)}
          className="min-w-80 rounded-md border border-[var(--dark)] p-2 dark:border-[var(--light)]"
        />
        {error && <span className="self-center text-red-500">{error}</span>}
        <button
          type="submit"
          className="w-full cursor-pointer rounded-md bg-[var(--dark)] p-2 font-medium text-[var(--light)] dark:bg-[var(--light)] dark:text-[var(--dark)]"
        >
          Save
        </button>
      </form>
    </Modal>
  );
}

function UpdatePlaceModal({ isOpen, onClose, onUpdate, onDelete, place }) {
  const [placeName, setPlaceName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (place) {
      setPlaceName(place.name || "");
      setError("");
    }
  }, [place]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!placeName) {
      setError("Place name is required");
      return;
    }

    setError("");
    try {
      await onUpdate({ name: placeName, parent_uid: place.parent_uid });
      onClose();
    } catch (err) {
      const msg = err?.response?.data?.detail || "Something went wrong";
      setError(msg);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setError("");
      }}
    >
      <h2 className="text-md mb-4 wrap-anywhere">Update place {place?.name}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-sm">
        <input
          type="text"
          placeholder="Name"
          name="name"
          minLength={1}
          maxLength={64}
          value={placeName}
          onChange={(e) => setPlaceName(e.target.value)}
          className="min-w-80 rounded-md border border-[var(--dark)] p-2 dark:border-[var(--light)]"
        />
        {error && <span className="self-center text-red-500">{error}</span>}
        <button
          type="submit"
          className="w-full cursor-pointer rounded-md bg-[var(--dark)] p-2 font-medium text-[var(--light)] dark:bg-[var(--light)] dark:text-[var(--dark)]"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => {
            onDelete();
            onClose();
          }}
          className="w-full cursor-pointer rounded-md bg-[var(--dark)] p-2 font-medium text-red-500 dark:bg-[var(--light)]"
        >
          Delete
        </button>
      </form>
    </Modal>
  );
}

export default function Places() {
  const { placeUID } = useParams();
  const [places, setPlaces] = useState([]);
  const [current, setCurrent] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchPlaces = async (uid) => {
    setPlaces([]);
    const filter = uid ? `?parent_uid__eq=${uid}` : "?parent_uid__eq=null";
    const res = await axios.get(`/places/${filter}`);
    setPlaces(res.data);
  };

  const fetchCurrentPlace = useCallback(
    async (uid) => {
      if (!uid) {
        setCurrent(null);
        fetchPlaces(null);
        return;
      }
      try {
        const res = await axios.get(`/places/${uid}/`);
        setCurrent(res.data);
        fetchPlaces(uid);
      } catch (err) {
        if (err.response?.status === 404) {
          navigate("/places");
        }
      }
    },
    [navigate],
  );

  useEffect(() => {
    setLoading(true);

    fetchCurrentPlace(placeUID).finally(() => setLoading(false));
  }, [placeUID, fetchCurrentPlace]);

  if (loading) return <Loading />;

  return (
    <div className="flex h-screen flex-col py-50">
      <div className="absolute top-12 left-1/2 flex -translate-x-1/2 flex-col items-center">
        {current && (
          <Link
            to={`/places${current.parent ? "/" + current.parent.uid : ""}`}
            className="text-sm text-gray-400 duration-200 hover:scale-130 hover:text-[var(--dark)] dark:hover:text-[var(--light)]"
          >
            {current.parent ? current.parent.name : "Root"}
          </Link>
        )}
        <div className="relative flex items-center gap-5 overflow-hidden">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="group flex w-10 flex-col items-center rounded py-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 cursor-pointer text-gray-400 transition-all duration-300 group-hover:-translate-y-2 group-hover:text-[var(--dark)] dark:group-hover:text-[var(--light)]"
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
          </button>
          <h1
            className={
              "flex text-center text-3xl wrap-anywhere" +
              (current ? " cursor-pointer" : " cursor-default")
            }
            onClick={() => {
              if (current) setIsUpdateModalOpen(true);
            }}
          >
            {current ? current.name : "Root"}
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
      </div>
      <CreatePlaceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        parent={current}
        onCreate={(data) =>
          axios.post("/places/", data).then((res) => {
            setPlaces((prev) => [...prev, res.data]);
          })
        }
      />
      <UpdatePlaceModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        place={current}
        onUpdate={(data) =>
          axios.patch(`/places/${current.uid}/`, data).then((res) => {
            setCurrent(res.data);
          })
        }
        onDelete={() =>
          axios.delete(`/places/${current.uid}/`).then(() => {
            console.log(current);
            const parentUID = current.parent?.uid;
            const path = parentUID ? `/places/${parentUID}` : "/places";
            navigate(path);
          })
        }
      />
      {places.length === 0 ? (
        <span className="m-auto text-gray-400">No children</span>
      ) : (
        <div className="scrollarea m-auto flex w-2/3 flex-wrap justify-center gap-3 overflow-y-auto">
          {places.map((place) => (
            <PlaceCard key={place.uid} place={place} />
          ))}
        </div>
      )}
    </div>
  );
}
