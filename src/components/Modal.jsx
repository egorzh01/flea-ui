import { useEffect } from "react";

export default function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    const closeOnEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", closeOnEsc);
    return () => document.removeEventListener("keydown", closeOnEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="w-fit max-w-md rounded-xl bg-[var(--light)] p-6 shadow-xl dark:bg-[var(--dark)]"
        onClick={(e) => e.stopPropagation()} // не закрывать по клику на саму модалку
      >
        {children}
      </div>
    </div>
  );
}
