// import React from "react";
// import {
//   Settings,
//   Star,
//   Play,
//   Folder,
//   X,
//   Info,
//   UtilityPole,
//   Minus,
//   Square,
//   Pause,
// } from "lucide-react";
// import { useState } from "react";
// import FreqRoller from "./FreqRoller";
// import Input from "./Slider";
// import Slider from "./Slider";

// const SDRControlPanel = () => {
//   const [isStarClicked, setIsStarClicked] = useState(false);
//   const [isPlayClicked, setIsPlayClicked] = useState(false);
//   const [gain, setGain] = useState(0);

//   return (
//     <div className="w-fill h-full bg-transparent hover:border-[2px] border-[#03DD70] text-xs shadow-lg">
//       {/* Title Bar */}
//       <div className="flex items-center justify-between bg-[#2d2d2a7f] p-1 text-white text-sm rounded-t-lg">
//         <div className="flex items-center space-x-1">
//           {/* <div className="bg-red-600 px-1 text-xs rounded">T:0</div> */}
//           {/* <Settings size={16} className="cursor-pointer" /> */}
//           <Info size={16} className="cursor-pointer" />
//           <Star
//             size={16}
//             className={`cursor-pointer ${
//               isStarClicked ? "text-yellow-400" : ""
//             }`}
//             onClick={() => setIsStarClicked(!isStarClicked)}
//             title="StarClicked"
//           />
//           <span>Control</span>
//         </div>
//         <div className="flex items-center space-x-1">
//           <Minus size={16} className="cursor-pointer" />
//           <Square size={16} className="cursor-pointer" />
//           <X size={16} className="cursor-pointer" />
//         </div>
//       </div>

//       {/* Body */}
//       <div className="p-1 space-y-2 text-white">
//         {/* Play button & Frequency */}
//         <div className="flex justify-between items-center">
//           <div className="flex text-xs font-mono tracking-widest  p-1 rounded">
//             {/* <FrequencyRoller /> */}
//             <FreqRoller />
//           </div>
//           {/* <span className="text-sm">kHz</span> */}
//           <div
//             className={`${
//               isPlayClicked ? "bg-green-500" : "bg-red-500"
//             } w-5 h-5 p-1 flex items-center rounded cursor-pointer`}
//             onClick={() => setIsPlayClicked(!isPlayClicked)}
//           >
//             {isPlayClicked ? <Play size={16} /> : <Pause size={16} />}
//           </div>
//         </div>

//         {/* SR Section */}
//         <div className="flex items-center space-x-3">
//           {/* <span>SR</span> */}
//           <div className=" text-xs font-mono tracking-widest  p-1 rounded">
//             <FreqRoller />
//           </div>
//           {/* 2D2D2A */}
//           <span className="text-xs">S/s</span>
//           <div className="flex items-center bg-[#2d2d2a7f] px-2 py-1 rounded">
//             <span>Int</span>
//             <select className="ml-1 text-white outline-0">
//               <option value="1" className="bg-[#2d2d2a7f] text-xs">
//                 1
//               </option>
//               <option value="2" className="bg-[#2d2d2a7f] text-xs">
//                 2
//               </option>
//             </select>
//           </div>
//         </div>
//         {/* {GAIN} */}
//         {/* Time Display */}
//         <div className="flex justify-between space-x-8 items-center">
//           <Slider />
//           <div className="text-xs text-gray-400 text-right">00:00:00.000</div>
//         </div>

//         <div className="flex items-center justify-between space-x-8">
//           <div className="flex items-center space-x-1">
//             <div className="flex items-center justify-center rounded cursor-pointer">
//               {/* <UtilityPole /> */}
//             </div>
//             <div className="bg-[#2d2d2a7f] p-1 rounded w-full text-xs truncate">
//               <label className="text-white text-sm">Mode:</label>
//               <select className="ml-1  text-white outline-0">
//                 <option value="TX" className="bg-[#2d2d2a7f] text-xs">
//                   TX
//                 </option>
//                 <option value="RX" className="bg-[#2d2d2a7f] text-xs">
//                   RX
//                 </option>
//               </select>
//             </div>
//             <X />
//           </div>
//           <div className="flex items-center  space-x-1">
//             <span>Clock</span>
//             <div className="bg-[#2d2d2a7f] p-1 rounded w-full text-xs truncate">
//               <select className="ml-1  text-white outline-0">
//                 <option value="internal" className="bg-[#2d2d2a7f] text-xs">
//                   Internal
//                 </option>
//                 <option value="external" className="bg-[#2d2d2a7f] text-xs">
//                   External
//                 </option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SDRControlPanel;

//
import React, { useState } from "react";
import {
  Info,
  Star,
  Play,
  Pause,
  Minus,
  Square,
  X,
  StarIcon,
} from "lucide-react";
import FreqRoller from "./FreqRoller";
import Slider from "./Slider";
import styles from "./SDRControlPanel.module.css";

const SDRControlPanel = () => {
  const [isStarClicked, setIsStarClicked] = useState(false);
  const [isPlayClicked, setIsPlayClicked] = useState(false);

  return (
    <div className={styles.panel}>
      {/* Title Bar */}
      <div className={styles.titleBar}>
        <div className={styles.titleLeft}>
          <Info size={16} />
          <div onClick={() => setIsStarClicked(!isStarClicked)}>
            {isStarClicked ? (
              <StarIcon size={16} className="fill-current text-yellow-400" />
            ) : (
              <StarIcon size={16} />
            )}
          </div>
          <span>Control</span>
        </div>
        <div className={styles.titleRight}>
          <Minus size={16} />
          <Square size={16} />
          <X size={16} />
        </div>
      </div>

      {/* Body */}
      <div className={styles.body}>
        {/* Play + Frequency */}
        <div className={styles.section}>
          <div className={styles.rollerBox}>
            <FreqRoller />
          </div>
          <div
            className={`${styles.playButton} ${
              isPlayClicked ? styles.playing : styles.stopped
            }`}
            onClick={() => setIsPlayClicked(!isPlayClicked)}
          >
            {isPlayClicked ? <Play size={16} /> : <Pause size={16} />}
          </div>
        </div>

        {/* SR Section */}
        <div className={styles.srSection}>
          <div className={styles.rollerBox}>
            <FreqRoller />
          </div>
          <span>S/s</span>
          <div className={styles.dropdownWrapper}>
            <span>Int</span>
            <select className={styles.dropdownSelect}>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
        </div>

        {/* Gain & Timer */}
        <div className={styles.sliderWrapper}>
          <Slider />
          <div>00:00:00.000</div>
        </div>

        {/* Mode + Clock */}
        <div className={styles.sliderWrapper}>
          <div className={styles.modeSection}>
            <div className={styles.modeBox}>
              <label className="">Mode:</label>
              <select className={styles.dropdownSelect}>
                <option value="TX">TX</option>
                <option value="RX">RX</option>
              </select>
            </div>
            {/* <X /> */}
          </div>
          <div className={styles.clockSection}>
            <span>Clock</span>
            <div className={styles.modeBox}>
              <select className={styles.dropdownSelect}>
                <option value="internal">Internal</option>
                <option value="external">External</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SDRControlPanel;
