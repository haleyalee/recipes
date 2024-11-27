"use client";

import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

interface BackButtonProps {
  confirm?: boolean,
  children: React.ReactNode
}

export default function BackButton({ confirm, children }: BackButtonProps) {
  const [showModal, setShowModal] = useState(false);

  const handleClick = (e: { preventDefault: () => void; }) => {
    if (confirm) {
      e.preventDefault();
      setShowModal(true);
    }
  }

  const closeModal = () => {
    setShowModal(false);
  }

  return (
    <>
      <a 
        href="/recipes" 
        className="block hover:underline text-linkGreen mb-4"
        onClick={handleClick}
        >
        {`< ${ children }`}
      </a>
      <ConfirmationModal isOpen={showModal} onClose={closeModal} />
    </>
  );
}
