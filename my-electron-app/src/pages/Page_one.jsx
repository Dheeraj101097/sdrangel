import React from "react";
import SDRControlPanel from "../components/box_1_freq/SDRControlPanel";
import FrequencyGraph from "../components/box_2/FrequencyGraph";
import FreqBox from "../components/box_2/FreqBox";

const page_one = () => {
  return (
    <>
      <div className="bg-[#1f1f1d] grid grid-rows-2 sm:grid-cols-2 md:grid-cols-2  lg:grid-cols-2 gap-2 h-screen w-screen">
        <div className="bg-[#1f1f1d] p-2 h-fit">
          <SDRControlPanel />
        </div>
        <div className="bg-[#1f1f1d] p-2 h-fit">
          <FreqBox />
        </div>
        <div className="bg-yellow-100 p-2 h-fit">Window 3</div>
        <div className="bg-red-100 p-2 h-fit">Window 4</div>
      </div>
    </>
  );
};

export default page_one;
