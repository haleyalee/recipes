"use client";

import React, { useState } from "react";
import ConfirmationModal from "@/components/ConfirmationModal";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  confirm?: boolean,
  children: React.ReactNode
}

export default function BackButton({ confirm, children }: BackButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleClick = (e: { preventDefault: () => void; }) => {
    if (confirm) {
      e.preventDefault();
      setShowModal(true);
    }
  }

  const handleClose = () => {
    setShowModal(false);
  }
  
  const handleConfirm = () => {
    setShowModal(false);
    router.back();
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
      <ConfirmationModal 
        isOpen={showModal} 
        onClose={handleClose} 
        onConfirm={handleConfirm} 
        description="Your changes will not be saved. Are you sure you want to continue?"
      />
    </>
  );
}
