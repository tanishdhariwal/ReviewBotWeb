import React from 'react'
import { useState, useEffect } from 'react'

const scrapingStages = [
  "Initializing",
  "Connecting",
  "Fetching",
  "Parsing",
  "Storing",
  "Validating"
]

interface HologramCubeLoaderProps {
  size?: number
  isOpen?: boolean
  onClose?: () => void
}

export  default function CubeLoader({ size = 150, isOpen = true, onClose }: HologramCubeLoaderProps) {
  const [currentStage, setCurrentStage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStage((prevStage) => (prevStage + 1) % scrapingStages.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  if (!isOpen) return null

  const halfSize = size / 2
  const fontSize = Math.max(size / 20, 12) // Ensure minimum font size of 12px

  return ( 
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-transparent backdrop-blur-md" />
      <div className="relative">
        <div className={`relative w-${size} h-${size}`} style={{ width: size, height: size }}>
          <div className="cube">
            {scrapingStages.map((stage, index) => (
              <div key={stage} className={`side side-${index}`}>
                <span className="text-sm font-bold" style={{ fontSize: `${fontSize}px` }}>{stage}</span>
              </div>
            ))}
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-purple-900 hover:text-purple-900 focus:outline-double"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      <style>{`
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
          background: rgba(233, 213, 255, 0.3);
          border: 2px solid rgba(147, 51, 234, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #4c1d95;
          box-shadow: 0 0 20px rgba(147, 51, 234, 0.3);
          backdrop-filter: blur(5px);
          animation: pulse 2s infinite ease-in-out;
          text-shadow: 0 0 10px rgba(147, 51, 234, 0.5);
        }
        .side-0 { transform: rotateY(0deg) translateZ(${halfSize}px); }
        .side-1 { transform: rotateY(180deg) translateZ(${halfSize}px); }
        .side-2 { transform: rotateY(90deg) translateZ(${halfSize}px); }
        .side-3 { transform: rotateY(-90deg) translateZ(${halfSize}px); }
        .side-4 { transform: rotateX(90deg) translateZ(${halfSize}px); }
        .side-5 { transform: rotateX(-90deg) translateZ(${halfSize}px); }
        @keyframes rotate {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg) ; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.8; box-shadow: 0 0 20px rgba(147, 51, 234, 0.3); }
          50% { opacity: 0.5; box-shadow: 0 0 40px rgba(147, 51, 234, 0.5); }
        }
      `}</style>
    </div>
  )
}