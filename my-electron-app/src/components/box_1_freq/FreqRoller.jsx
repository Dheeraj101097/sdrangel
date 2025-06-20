// import React, { useState, useRef, useEffect } from "react";

// // Utility functions
// const padDigits = (num, size) =>
//   num.toString().padStart(size, "0").split("").map(Number);
// const formatFrequency = (freq) => freq.toLocaleString();
// const toMHz = (freq) => (freq / 1_000_000).toFixed(3);

// const DIGIT_COUNT = 9;
// const MAX_FREQ = 999_999_999;
// const ANIMATION_DURATION = 600;

// export default function FreqRoller() {
//   const [frequency, setFrequency] = useState(14500000);
//   const [selectedDigit, setSelectedDigit] = useState(-1);
//   const [animating, setAnimating] = useState(false);
//   const [digitStates, setDigitStates] = useState(() =>
//     padDigits(14500000, DIGIT_COUNT)
//   );
//   const [rolling, setRolling] = useState(Array(DIGIT_COUNT).fill(null));
//   const [darkMode, setDarkMode] = useState(false);
//   const inputRef = useRef();
//   const digitRefs = useRef(
//     Array(DIGIT_COUNT)
//       .fill()
//       .map(() => React.createRef())
//   );
//   const timeoutRef = useRef();

//   // Dark mode toggle
//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [darkMode]);

//   // Update digit states and animate on frequency change
//   useEffect(() => {
//     const oldDigits = digitStates;
//     const newDigits = padDigits(frequency, DIGIT_COUNT);
//     const newRolling = Array(DIGIT_COUNT).fill(null);
//     let hasChange = false;

//     for (let i = 0; i < DIGIT_COUNT; i++) {
//       if (oldDigits[i] !== newDigits[i]) {
//         hasChange = true;
//         // More sophisticated direction detection for smooth rolling
//         const diff = newDigits[i] - oldDigits[i];
//         if (diff > 5 || (diff < 0 && diff > -5)) {
//           newRolling[i] = "down";
//         } else {
//           newRolling[i] = "up";
//         }
//       }
//     }

//     setRolling(newRolling);
//     setDigitStates(newDigits);

//     if (hasChange) {
//       setAnimating(true);
//       clearTimeout(timeoutRef.current);
//       timeoutRef.current = setTimeout(
//         () => setAnimating(false),
//         ANIMATION_DURATION
//       );
//     }
//   }, [frequency]);

//   // Cleanup timeout on unmount
//   useEffect(() => () => clearTimeout(timeoutRef.current), []);

//   // Handlers
//   const handleDigitClick = (idx) => {
//     setSelectedDigit(idx);
//     digitRefs.current[idx].current.focus();
//   };

//   const handleDigitWheel = (idx, e) => {
//     e.preventDefault();
//     if (animating) return;
//     adjustDigit(idx, e.deltaY > 0 ? -1 : 1);
//   };

//   const handleDigitKeyDown = (idx, e) => {
//     if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key))
//       e.preventDefault();
//     if (e.key === "ArrowUp") adjustDigit(idx, 1);
//     else if (e.key === "ArrowDown") adjustDigit(idx, -1);
//     else if (e.key === "ArrowLeft" && idx > 0) {
//       setSelectedDigit(idx - 1);
//       digitRefs.current[idx - 1].current.focus();
//     } else if (e.key === "ArrowRight" && idx < DIGIT_COUNT - 1) {
//       setSelectedDigit(idx + 1);
//       digitRefs.current[idx + 1].current.focus();
//     }
//   };

//   const handleGlobalKeyDown = (e) => {
//     if (selectedDigit < 0 || animating) return;
//     if (e.key === "ArrowUp") {
//       e.preventDefault();
//       adjustDigit(selectedDigit, 1);
//     } else if (e.key === "ArrowDown") {
//       e.preventDefault();
//       adjustDigit(selectedDigit, -1);
//     } else if (e.key === "Escape") {
//       setSelectedDigit(-1);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("keydown", handleGlobalKeyDown);
//     return () => document.removeEventListener("keydown", handleGlobalKeyDown);
//   }, [selectedDigit, animating]);

//   const adjustDigit = (idx, delta) => {
//     const digitPos = DIGIT_COUNT - 1 - idx;
//     const multiplier = Math.pow(10, digitPos);
//     const currentDigit = Math.floor(frequency / multiplier) % 10;
//     const newDigit = (currentDigit + delta + 10) % 10;
//     const diff = (newDigit - currentDigit) * multiplier;
//     const newFreq = frequency + diff;
//     if (newFreq >= 0 && newFreq <= MAX_FREQ) {
//       setFrequency(newFreq);
//       if (inputRef.current) inputRef.current.value = newFreq;
//     }
//   };

//   const handleInputChange = (e) => {
//     let value = parseInt(e.target.value) || 0;
//     if (value > MAX_FREQ) value = MAX_FREQ;
//     setFrequency(value);
//   };

//   const handleDemoClick = (freq) => {
//     setFrequency(freq);
//     if (inputRef.current) inputRef.current.value = freq;
//   };

//   // Click outside to deselect
//   useEffect(() => {
//     const handleClick = (e) => {
//       if (!e.target.closest(".digit-container")) setSelectedDigit(-1);
//     };
//     document.addEventListener("click", handleClick);
//     return () => document.removeEventListener("click", handleClick);
//   }, []);

//   return (
//     <div className="w-full max-w-fit">
//       {/* Main Frequency Display */}
//       <div className=" text-slate-400 text-center dark:text-slate-500">
//         {formatFrequency(frequency)} Hz
//       </div>

//       <div className="relative mb-2">
//         {/* Digital Roller Display */}
//         <div className="flex justify-center mb-6">
//           <div className="roller-container flex items-center gap-0.5 rounded-2xl bg-black/5 dark:bg-white/5 backdrop-blur-sm">
//             {digitStates.map((digit, i) => (
//               <React.Fragment key={i}>
//                 <div
//                   ref={digitRefs.current[i]}
//                   tabIndex={0}
//                   role="button"
//                   aria-label={`Digit ${i + 1}`}
//                   className={`digit-container roller-digit ${
//                     selectedDigit === i ? "selected" : ""
//                   }`}
//                   onClick={() => handleDigitClick(i)}
//                   onWheel={(e) => handleDigitWheel(i, e)}
//                   onKeyDown={(e) => handleDigitKeyDown(i, e)}
//                 >
//                   <div className="digit-roller">
//                     <div
//                       className={`digit-face ${
//                         rolling[i] ? `roll-${rolling[i]}` : ""
//                       }`}
//                     >
//                       <span className="digit-text">{digit}</span>
//                     </div>
//                   </div>
//                   {selectedDigit === i && (
//                     <div className="selection-indicator"></div>
//                   )}
//                 </div>
//                 {/* plac if req for mhz */}
//                 {/* {i === 2 && (
//                     <div className="separator">
//                       <div className="separator-dot"></div>
//                     </div>
//                   )} */}
//               </React.Fragment>
//             ))}
//           </div>
//         </div>

//         {/* Input Section */}
//         {/* <div className="max-w-md mx-auto">
//             <div className="relative">
//               <input
//                 ref={inputRef}
//                 type="number"
//                 id="frequencyInput"
//                 className="input-field w-full px-4 py-3 rounded-xl border-0 bg-white/60 dark:bg-black/20 backdrop-blur-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
//                 min={0}
//                 max={MAX_FREQ}
//                 defaultValue={14500000}
//                 placeholder="Enter frequency in Hz"
//                 onInput={handleInputChange}
//                 onWheel={(e) => e.preventDefault()}
//               />
//             </div>
//           </div> */}
//       </div>

//       {/* Embedded Styles */}
//       <style jsx>{`
//         .glass-panel {
//           background: rgba(0, 0, 0, 0.25);
//           backdrop-filter: blur(20px);
//           border: 1px solid rgba(255, 255, 255, 0.3);
//           box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
//         }

//         .dark .glass-panel {
//           background: rgba(0, 0, 0, 0.25);
//           border: 1px solid rgba(255, 255, 255, 0.1);
//           box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
//         }
//         .roller-digit {
//           position: relative;
//           width: 2em;
//           height: 2.4em;
//           perspective: 1000px;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .roller-digit:hover {
//           transform: scale(1.05);
//         }

//         .roller-digit.selected {
//           transform: scale(1.1);
//         }

//         .digit-roller {
//           position: relative;
//           width: 100%;
//           height: 100%;
//           transform-style: preserve-3d;
//         }

//         .digit-face {
//           position: absolute;
//           width: 100%;
//           height: 100%;
//           background: linear-gradient(
//             145deg,
//             rgba(0, 0, 0, 0.9) 0%,
//             rgba(0, 0, 0, 0.6) 50%,
//             rgba(255, 255, 255, 0.3) 100%
//           );
//           border: 1px solid rgba(255, 255, 255, 0.4);
//           border-radius: 8px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1),
//             inset 0 1px 2px rgba(255, 255, 255, 0.3),
//             inset 0 -1px 2px rgba(0, 0, 0, 0.1);
//           transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
//         }

//         .dark .digit-face {
//           background: linear-gradient(
//             145deg,
//             rgba(30, 41, 59, 0.9) 0%,
//             rgba(30, 41, 59, 0.6) 50%,
//             rgba(30, 41, 59, 0.3) 100%
//           );
//           border: 1px solid rgba(255, 255, 255, 0.1);
//           box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3),
//             inset 0 1px 2px rgba(255, 255, 255, 0.1),
//             inset 0 -1px 2px rgba(0, 0, 0, 0.3);
//         }
//         // fro font size
//         .digit-text {
//           font-family: "Courier New", monospace;
//           font-size: 18px;
//           font-weight: 700;
//           color: #1e293b;
//           text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
//         }

//         .dark .digit-text {
//           color: #f1f5f9;
//           text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
//         }

//         .roll-up {
//           animation: rollUp 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
//         }

//         .roll-down {
//           animation: rollDown 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
//         }

//         @keyframes rollUp {
//           0% {
//             transform: rotateX(0deg);
//           }
//           50% {
//             transform: rotateX(-90deg);
//             background: linear-gradient(
//               145deg,
//               rgba(99, 102, 241, 0.3) 0%,
//               rgba(139, 92, 246, 0.3) 100%
//             );
//           }
//           100% {
//             transform: rotateX(0deg);
//           }
//         }

//         @keyframes rollDown {
//           0% {
//             transform: rotateX(0deg);
//           }
//           50% {
//             transform: rotateX(90deg);
//             background: linear-gradient(
//               145deg,
//               rgba(99, 102, 241, 0.3) 0%,
//               rgba(139, 92, 246, 0.3) 100%
//             );
//           }
//           100% {
//             transform: rotateX(0deg);
//           }
//         }

//         .selection-indicator {
//           position: absolute;
//           bottom: -8px;
//           left: 50%;
//           transform: translateX(-50%);
//           width: 24px;
//           height: 3px;
//           background: linear-gradient(90deg, #6366f1, #8b5cf6);
//           border-radius: 2px;
//           animation: pulse 2s infinite;
//         }

//         @keyframes pulse {
//           0%,
//           100% {
//             opacity: 0.5;
//           }
//           50% {
//             opacity: 1;
//           }
//         }

//         .separator {
//           display: flex;
//           align-items: center;
//           height: 64px;
//           margin: 0 8px;
//         }

//         .separator-dot {
//           width: 8px;
//           height: 8px;
//           border-radius: 50%;
//           background: linear-gradient(135deg, #6366f1, #8b5cf6);
//           box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
//           animation: dotPulse 3s infinite;
//         }

//         @keyframes dotPulse {
//           0%,
//           100% {
//             transform: scale(1);
//           }
//           50% {
//             transform: scale(1.2);
//           }
//         }

//         .input-field {
//           box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1),
//             inset 0 1px 2px rgba(255, 255, 255, 0.3);
//         }

//         .dark .input-field {
//           box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3),
//             inset 0 1px 2px rgba(255, 255, 255, 0.1);
//         }

//         .demo-button {
//           box-shadow: 0 4px 16px rgba(99, 102, 241, 0.3);
//         }

//         .demo-button:hover {
//           box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);
//         }

//         /* Responsive adjustments */
//         @media (max-width: 768px) {
//           .roller-digit {
//             width: 40px;
//             height: 56px;
//           }

//           .digit-text {
//             font-size: 24px;
//           }

//           .roller-container {
//             gap: 2px;
//             padding: 6px;
//           }

//           .separator {
//             margin: 0 4px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

//
import React, { useState, useRef, useEffect } from "react";
import styles from "./FreqRoller.module.css";

const padDigits = (num, size) =>
  num.toString().padStart(size, "0").split("").map(Number);
const formatFrequency = (freq) => freq.toLocaleString();

const DIGIT_COUNT = 9;
const MAX_FREQ = 999_999_999;
const ANIMATION_DURATION = 600;

export default function FreqRoller() {
  const [frequency, setFrequency] = useState(14500000);
  const [selectedDigit, setSelectedDigit] = useState(-1);
  const [animating, setAnimating] = useState(false);
  const [digitStates, setDigitStates] = useState(() =>
    padDigits(14500000, DIGIT_COUNT)
  );
  const [rolling, setRolling] = useState(Array(DIGIT_COUNT).fill(null));
  const [darkMode, setDarkMode] = useState(false);
  const digitRefs = useRef(
    Array(DIGIT_COUNT)
      .fill()
      .map(() => React.createRef())
  );
  const timeoutRef = useRef();

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  useEffect(() => {
    const oldDigits = digitStates;
    const newDigits = padDigits(frequency, DIGIT_COUNT);
    const newRolling = Array(DIGIT_COUNT).fill(null);
    let hasChange = false;

    for (let i = 0; i < DIGIT_COUNT; i++) {
      if (oldDigits[i] !== newDigits[i]) {
        hasChange = true;
        const diff = newDigits[i] - oldDigits[i];
        if (diff > 5 || (diff < 0 && diff > -5)) {
          newRolling[i] = "down";
        } else {
          newRolling[i] = "up";
        }
      }
    }

    setRolling(newRolling);
    setDigitStates(newDigits);

    if (hasChange) {
      setAnimating(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(
        () => setAnimating(false),
        ANIMATION_DURATION
      );
    }
  }, [frequency]);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const handleDigitClick = (idx) => {
    setSelectedDigit(idx);
    digitRefs.current[idx].current.focus();
  };

  const handleDigitWheel = (idx, e) => {
    e.preventDefault();
    if (animating) return;
    adjustDigit(idx, e.deltaY > 0 ? -1 : 1);
  };

  const handleDigitKeyDown = (idx, e) => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key))
      e.preventDefault();
    if (e.key === "ArrowUp") adjustDigit(idx, 1);
    else if (e.key === "ArrowDown") adjustDigit(idx, -1);
    else if (e.key === "ArrowLeft" && idx > 0) {
      setSelectedDigit(idx - 1);
      digitRefs.current[idx - 1].current.focus();
    } else if (e.key === "ArrowRight" && idx < DIGIT_COUNT - 1) {
      setSelectedDigit(idx + 1);
      digitRefs.current[idx + 1].current.focus();
    }
  };

  const adjustDigit = (idx, delta) => {
    const digitPos = DIGIT_COUNT - 1 - idx;
    const multiplier = Math.pow(10, digitPos);
    const currentDigit = Math.floor(frequency / multiplier) % 10;
    const newDigit = (currentDigit + delta + 10) % 10;
    const diff = (newDigit - currentDigit) * multiplier;
    const newFreq = frequency + diff;
    if (newFreq >= 0 && newFreq <= MAX_FREQ) {
      setFrequency(newFreq);
    }
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest(".digit-container")) setSelectedDigit(-1);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div>
      <div className={`${styles.headingfreq}`}>
        {formatFrequency(frequency)} Hz
      </div>
      <div className="relative mb-2">
        <div className={`${styles.container}`}>
          {digitStates.map((digit, i) => (
            <div
              key={i}
              ref={digitRefs.current[i]}
              tabIndex={0}
              role="button"
              aria-label={`Digit ${i + 1}`}
              className={`${styles.rollerDigit} ${
                selectedDigit === i ? styles.rollerDigitSelected : ""
              }`}
              onClick={() => handleDigitClick(i)}
              onWheel={(e) => handleDigitWheel(i, e)}
              onKeyDown={(e) => handleDigitKeyDown(i, e)}
            >
              <div className={styles.digitRoller}>
                <div
                  className={`${styles.digitFace} ${
                    rolling[i] === "up"
                      ? styles.rollUp
                      : rolling[i] === "down"
                      ? styles.rollDown
                      : ""
                  }`}
                >
                  <span className={styles.digitText}>{digit}</span>
                </div>
              </div>
              {selectedDigit === i && (
                <div className={styles.selectionIndicator}></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
