import React from "react";
import { ThreeCircles } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-auto">
      <ThreeCircles height="100" width="100" color="#f33f3f" wrapperStyle={{}} wrapperClass="" visible={true} ariaLabel="three-circles-rotating" outerCircleColor="" innerCircleColor="" middleCircleColor="" />
    </div>
  );
};

export default Loader;
