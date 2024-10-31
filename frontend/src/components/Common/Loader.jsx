import React from 'react';

const LoaderModal = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm">
      <div className="flex flex-col items-center">
        {/* Loader Spinner */}
        <svg
          className="animate-spin h-12 w-12 text-black"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM12 20a8 8 0 01-8-8H0c0 6.627 5.373 12 12 12v-4zm2-8a2 2 0 100-4 2 2 0 000 4z"
          ></path>
        </svg>
        <p className="text-white mt-4">Loading...</p>
      </div>
    </div>
  );
};

export default LoaderModal;