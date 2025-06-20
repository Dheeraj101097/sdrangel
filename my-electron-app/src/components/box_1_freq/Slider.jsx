// import React from "react";
// import styled from "styled-components";
// import { useState } from "react";
// const Input = () => {
//   const [gain, setGain] = useState(0);
//   return (
//     <StyledWrapper>
//       <input
//         id="myRange"
//         className="slider"
//         value={gain}
//         onChange={(e) => setGain(Number(e.target.value))}
//         max={100}
//         min={0}
//         type="range"
//       />
//       <div className="text-xs text-gray-400 text-right">Gain: {gain} dB</div>
//     </StyledWrapper>
//   );
// };

// const StyledWrapper = styled.div`
//   .slider {
//     -webkit-appearance: none;
//     width: 100%;
//     height: 8px;
//     border-radius: 5px;
//     background-color: #4158d0;
//     // background-image: linear-gradient(
//     //   43deg,
//     //   #4158d0 0%,
//     //   #c850c0 46%,
//     //   #ffcc70 100%
//     // );
//     background-image: linear-gradient(43deg, #ffffff 0%, #50f785 100%);
//     outline: none;
//     opacity: 0.7;
//     -webkit-transition: 0.2s;
//     transition: opacity 0.2s;
//   }

//   .slider::-webkit-slider-thumb {
//     -webkit-appearance: none;
//     appearance: none;
//     width: 16px;
//     height: 16px;
//     border-radius: 50%;
//     background-color: #4c00ff;
//     background-image: linear-gradient(160deg, #4900f5 0%, #80d0c7 100%);
//     cursor: pointer;
//   }

//   .slider::-moz-range-thumb {
//     width: 16px;
//     height: 16px;
//     border-radius: 50%;
//     background-color: #0093e9;
//     background-image: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%);
//     cursor: pointer;
//   }
// `;

// export default Input;

//
import React, { useState } from "react";
import styles from "./Slider.module.css";

const Slider = () => {
  const [gain, setGain] = useState(0);

  return (
    <div className="">
      <input
        id="myRange"
        className={styles.slider}
        value={gain}
        onChange={(e) => setGain(Number(e.target.value))}
        max={100}
        min={0}
        type="range"
      />
      <div className={`${styles.gainDisplay}`}>Gain: {gain} dB</div>
    </div>
  );
};

export default Slider;
