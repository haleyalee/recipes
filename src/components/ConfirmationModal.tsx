"use client";

import React, { useState, useEffect, useRef } from "react";

interface ConfirmationModalProps {
  isOpen: boolean,
  onClose: ()=>void,
  onConfirm: ()=>void,
  title?: string,
  description: string,
  confirmBtn?: string
}

export default function ConfirmationModal({ isOpen, onClose, onConfirm, title, description, confirmBtn = "Yes, take me back" }: ConfirmationModalProps) {
  const [animate, setAnimate] = useState(false);
  const modalRef = useRef<HTMLDivElement|null>(null);
  
  useEffect(() => {
    if (isOpen) setAnimate(true);
    else setAnimate(false);
  }, [isOpen]);
  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };
  
  return (
    isOpen ? (
      <div 
        id="confirmation__modal"
        className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-500 ${animate ? 'opacity-100' : 'opacity-0'}`}
      >
        <div 
          ref={modalRef}
          className={`absolute flex flex-col bg-gray-100 w-2/4 h-fit p-8 rounded-md items-center justify-center shadow-lg transition-transform duration-500 transform ${animate ? 'scale-100' : 'scale-95'}`}
          >
          {title && <h2>{title}</h2>}
          <h3 className="text-md mb-4">{description}</h3>
          <div className="flex gap-4">
            <button 
              id="go-back__btn"
              className="bg-linkGreen text-white px-3 py-1 rounded-full hover:bg-hoverGreen shadow-sm"
              onClick={onConfirm}
            >
              {confirmBtn}
            </button>
            <button 
              id="cancel__btn"
              className="text-linkGreen hover:underline"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    ) : null
  );
}
