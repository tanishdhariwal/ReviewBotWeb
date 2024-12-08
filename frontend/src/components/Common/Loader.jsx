import React from 'react';

const LoaderModal = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-slate-950">
            <img 
                src="/Group 1.png" 
                alt="Loading" 
                className="w-96 h-20 animate-pulse duration-75"
            />
        </div>
  );
};

export default LoaderModal;