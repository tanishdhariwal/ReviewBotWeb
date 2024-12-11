import React from "react";

const HexagonOverlay = () => {
  return (
    <>
      <div>
        <style>{`
          .hexagon {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hexagon .row {
            display: flex;
          }
          .arrow {
            width: 0;
            height: 0;
            margin: 0 -1.25vmin;
            border-left: 2.5vmin solid transparent;
            border-right: 2.5vmin solid transparent;
            border-bottom: 4.5vmin solid #7c3aed;
            animation: blink 1s infinite;
            filter: drop-shadow(0 0 3.75vmin #7c3aed);
          }
          .arrow.down {
            transform: rotate(180deg);
          }
          .arrow.outer-1 { animation-delay: -0.06s; }
          .arrow.outer-2 { animation-delay: -0.11s; }
          .arrow.outer-3 { animation-delay: -0.17s; }
          .arrow.outer-4 { animation-delay: -0.22s; }
          .arrow.outer-5 { animation-delay: -0.28s; }
          .arrow.outer-6 { animation-delay: -0.33s; }
          .arrow.outer-7 { animation-delay: -0.39s; }
          .arrow.outer-8 { animation-delay: -0.44s; }
          .arrow.outer-9 { animation-delay: -0.50s; }
          .arrow.outer-10 { animation-delay: -0.56s; }
          .arrow.outer-11 { animation-delay: -0.61s; }
          .arrow.outer-12 { animation-delay: -0.67s; }
          .arrow.outer-13 { animation-delay: -0.72s; }
          .arrow.outer-14 { animation-delay: -0.78s; }
          .arrow.outer-15 { animation-delay: -0.83s; }
          .arrow.outer-16 { animation-delay: -0.89s; }
          .arrow.outer-17 { animation-delay: -0.94s; }
          .arrow.outer-18 { animation-delay: -10s; }
          .arrow.inner-1 { animation-delay: -0.17s; }
          .arrow.inner-2 { animation-delay: -0.33s; }
          .arrow.inner-3 { animation-delay: -0.50s; }
          .arrow.inner-4 { animation-delay: -0.67s; }
          .arrow.inner-5 { animation-delay: -0.83s; }
          .arrow.inner-6 { animation-delay: -10s; }
          @keyframes blink {
            0% { opacity: 0.10; }
            30% { opacity: 1; }
            100% { opacity: 0.10; }
          }
        `}</style>
        <div className="hexagon">
          <div className="row">
            <div className="arrow up outer outer-18"></div>
            <div className="arrow down outer outer-17"></div>
            <div className="arrow up outer outer-16"></div>
            <div className="arrow down outer outer-15"></div>
            <div className="arrow up outer outer-14"></div>
          </div>
          <div className="row">
            <div className="arrow up outer outer-1"></div>
            <div className="arrow down outer outer-2"></div>
            <div className="arrow up inner inner-6"></div>
            <div className="arrow down inner inner-5"></div>
            <div className="arrow up inner inner-4"></div>
            <div className="arrow down outer outer-13"></div>
            <div className="arrow up outer outer-12"></div>
          </div>
          <div className="row">
            <div className="arrow down outer outer-3"></div>
            <div className="arrow up outer outer-4"></div>
            <div className="arrow down inner inner-1"></div>
            <div className="arrow up inner inner-2"></div>
            <div className="arrow down inner inner-3"></div>
            <div className="arrow up outer outer-11"></div>
            <div className="arrow down outer outer-10"></div>
          </div>
          <div className="row">
            <div className="arrow down outer outer-5"></div>
            <div className="arrow up outer outer-6"></div>
            <div className="arrow down outer outer-7"></div>
            <div className="arrow up outer outer-8"></div>
            <div className="arrow down outer outer-9"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HexagonOverlay;
