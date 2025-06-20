import React, { useState } from "react";
import FrequencyGraph from "./FrequencyGraph";
import { Settings, Star, Info, Minus, Square, X, StarIcon } from "lucide-react";
import images from "../../assets/export.js";
import styles from "./FreqBox.module.css";

const FreqBox = () => {
  const [isStarClicked, setIsStarClicked] = useState(false);

  return (
    <div className={styles.box}>
      {/* Title Bar */}
      <div className={styles.titleBar}>
        <div className={styles.titleLeft}>
          <Settings size={16} />
          <div onClick={() => setIsStarClicked(!isStarClicked)}>
            {isStarClicked ? (
              <StarIcon size={16} className="fill-current text-yellow-400" />
            ) : (
              <StarIcon size={16} />
            )}
          </div>
        </div>
        <div className={styles.titleRight}>
          <Info size={16} />
          <Minus size={16} />
          <Square size={16} />
          <X size={16} />
        </div>
      </div>

      <div className={`${styles.freqBox}`}>
        <FrequencyGraph />
        <FrequencyGraph />
      </div>

      {/* Tools Box */}
      <div className={styles.toolsBox}>
        <img src={images.gridrect} alt="GridIcon" className={styles.toolIcon} />
        <img src={images.world} alt="WorldIcon" className={styles.toolIcon} />
        <img
          src={images.truncate}
          alt="TruncateIcon"
          className={styles.toolIcon}
        />
        <img
          src={images.bell_phosphor}
          alt="BellPhosphorIcon"
          className={styles.toolIcon}
        />
        <img
          src={images.bell_max}
          alt="BellMaxIcon"
          className={styles.toolIcon}
        />
        <img
          src={images.bell_fill}
          alt="BellFillIcon"
          className={styles.toolIcon}
        />
        <img
          src={images.bell_gradient}
          alt="BellGradientIcon"
          className={styles.toolIcon}
        />
        <img
          src={images.bell_line}
          alt="BellLineIcon"
          className={styles.toolIcon}
        />
        <img
          src={images.bell_max}
          alt="BellMaxIcon"
          className={styles.toolIcon}
        />
      </div>
    </div>
  );
};

export default FreqBox;
