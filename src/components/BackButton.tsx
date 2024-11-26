"use client";

import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

export default function BackButton({ content = "Back", confirm }: { content?: string, confirm?: boolean }) {
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
        {`< ${content}`}
      </a>
      <ConfirmationModal isOpen={showModal} onClose={closeModal} />
    </>
  );
}
