import React, { useEffect, useState } from "react";
import UploadImage from "./components/UploadImage";
import GetImage from "./components/GetImage";

const App = () => {
  const [open, setOpen] = useState(false);

  const handleGetImages = (e, open) => {
    setOpen(!open);
  };
  return (
    <div className="min-h-screen pt-1 bg-[#282828] relative overflow-auto">
      <h1 className="text-6xl text-white font-bold text-center my-5 ">
        Welcome To Visual Vault
      </h1>
      <UploadImage />
      <div className="p-5 flex justify-center">
        <div>
          <div className="flex justify-center">
            <button
              className="text-white bg-[#98971a] w-60 p-2 m-2 rounded-md"
              onClick={(e) => {
                handleGetImages(e, open);
              }}
            >
              Get Images
            </button>
          </div>
          <div>{open && <GetImage />}</div>
        </div>
      </div>
    </div>
  );
};

export default App;
