"use client";
import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../redux/modals/slice";
import { MdClose } from 'react-icons/md';

export interface ReUseModalProps {
    children: React.ReactNode;
}

export default function ReUseModal({ children }: ReUseModalProps) {
    const dispatch = useDispatch();
    const handleClose = useCallback(() => dispatch(closeModal()), [dispatch]);
    useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleClose]);

  const handleBackdropClick = () => handleClose();
  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {event.stopPropagation();};

    return( <div className="fixed inset-0 flex items-center justify-center w-full h-full bg-gray-500/50  " onClick={handleBackdropClick}>
      <div className=" relative w-auto h-auto px-12 py-16 border-solid border-2 border-red-800 rounded-lg bg-[url(/modal.jpg)]" onClick={handleModalClick}>
        <button onClick={handleClose} className="w-6 h-6 rounded-full flex items-center justify-center absolute top-2 right-2 hover:bg-gray-200/70 transition-all duration-300">
        <MdClose size={30} />
        </button>
        {children}
      </div>
    </div>)
}