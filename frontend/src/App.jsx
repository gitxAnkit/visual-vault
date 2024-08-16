import React, { useEffect, useState } from "react";
import UploadImage from "./components/UploadImage";
import GetImage from "./components/GetImage";
import Home from "./components/Home";

const App = () => {
  return (
    <div className="min-h-screen pt-1 bg-[#282828] relative overflow-auto">
      <Home />
    </div>
  );
};

export default App;
