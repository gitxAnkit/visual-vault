import React from "react";

const Loader = () => {
  return (
    <div className="w-screen h-screen bg-white flex items-center justify-center">
      <div className="w-40 h-40 border-b-4 border-black rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
