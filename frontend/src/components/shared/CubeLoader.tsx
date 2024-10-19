"use client";

import React, { useState, useEffect } from "react";

const scrapingStages = [
  "Initializing",
  "Connecting",
  "Fetching",
  "Parsing",
  "Storing",
  "Validating",
];

interface HologramCubeLoaderProps {
  size?: number;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function CubeLoader({
  size = 160,
  isOpen = true,
  onClose,
}: HologramCubeLoaderProps) {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStage((prevStage) => (prevStage + 1) % scrapingStages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  const halfSize = size / 2;
  const fontSize = Math.max(size / 16, 14);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-transparent backdrop-blur-md" />
      <div className="relative">
        <div
          className={`relative w-${size} h-${size}`}
          style={{ width: size, height: size }}
        >
          <div className="scene">
            <div className="cube">
              {scrapingStages.map((stage, index) => (
                <div key={stage} className={`side side-${index}`}>
                  <div className="text-container">
                    <span
                      className="text-sm font-bold"
                      style={{ fontSize: `${fontSize}px` }}
                    >
                      {stage}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-purple-700 hover:text-purple-900 focus:outline-none"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
      <style>{`
        .scene {
          width: ${size}px;
          height: ${size}px;
          perspective: 600px;
        }
        .cube {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: rotate 10s infinite linear;
        }
          .side {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom right, rgba(233, 213, 255, 0.2), rgba(76, 29, 149, 0.7));
          border: 2px solid rgba(147, 51, 234, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 20px rgba(147, 51, 234, 0.3);
          backdrop-filter: blur(5px);
          overflow: hidden;
        }
        .text-container {
          text-align: center;
          font-size: 1.5rem;
          display: flex;
          items: center;
          // background: rgba(76, 29, 149, 0.7);
          padding: 8px 10px;
          border-radius: 8px;
  
          font-size: 1.5rem;
          color: #f3e8ff;
          // text-shadow: 0 0 5px rgba(147, 51, 234, 0.5);
        }
        .side-0 { transform: rotateY(0deg) translateZ(${halfSize}px); }
        .side-1 { transform: rotateY(180deg) translateZ(${halfSize}px); } 
        .side-2 { transform: rotateY(90deg) translateZ(${halfSize}px); }
        .side-3 { transform: rotateY(-90deg) translateZ(${halfSize}px); }
        .side-4 { transform: rotateX(90deg) translateZ(${halfSize}px); }
        .side-5 { transform: rotateX(-90deg) translateZ(${halfSize}px); }
        @keyframes rotate {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
        }
      `}</style>
    </div>
  );
}
