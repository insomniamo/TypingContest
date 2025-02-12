import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./modal.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let root = document.getElementById("modal-root");
      if (!root) {
        root = document.createElement("div");
        root.id = "modal-root";
        document.body.appendChild(root);
      }
      setModalRoot(root);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !modalRoot) return null;

  return createPortal(
    <div className="modal" onClick={onClose}>
      <div className="modal__column" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
