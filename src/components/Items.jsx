import { useNavigate, useParams } from "react-router";
import { useCallback, useEffect, useState } from "react";
import axios from "../api";
import Modal from "./Modal";
import Loading from "./Loading";

function Filter({ name }) {
  return (
    <div className="h-fit w-fit rounded-xl border p-1 text-sm">
      <span>{name}</span>
    </div>
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

export default function Items() {
  const { placeUID } = useParams();
  const [places, setPlaces] = useState([]);

  const [current, setCurrent] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  let filters = ["In House, Garden", "Costs from $100 to $500"];
  let items =[{uid: 1, name: "Box with tools"}];

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
      <div className="absolute top-12 left-1/2 flex w-full -translate-x-1/2 flex-col items-center gap-3">
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
          <h1 className="flex text-center text-3xl">Items</h1>
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
                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
              />
            </svg>
            <span className="absolute top-full text-xs duration-200 group-hover:-translate-y-5">
              Filters
            </span>
          </button>
        </div>
        <div className="flex gap-3 rounded-xl border border-gray-400 p-2 text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search"
            className="w-80 bg-transparent outline-none"
            maxLength={64}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-1">
          {filters.map((filter_name) => (
            <Filter name={filter_name} />
          ))}
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
    </div>
  );
}
