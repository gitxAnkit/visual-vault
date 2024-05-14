import React from "react";
import UploadImage from "./components/UploadImage";
import GetImage from "./components/GetImage";

const App = () => {
  return (
    <div className="min-h-screen pt-1 bg-[#282828] relative overflow-auto">
      <h1 className="text-6xl text-white font-bold text-center my-5 ">
        Welcome To Visual Vault
      </h1>
      <UploadImage />
      <div className="p-5 flex justify-center">
        <GetImage />
      </div>
    </div>
  );
};

export default App;
