import React from 'react';

const Modal = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg relative w-full max-w-md">
        <button onClick={onClose} className="absolute top-3 right-4 text-gray-500 dark:text-gray-300 hover:text-red-500">
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
