import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import GetImage from "./GetImage";
import Albums from "./Albums";
import AddImages from "./AddImages";
import api from "../app/api";

const Home = () => {
  const [currentView, setCurrentView] = useState("images");
  const handleGetImages = () => {
    setCurrentView("images");
  };

  const handleGetAlbums = () => {
    setCurrentView("albums");
  };

  // Load images by default when component mounts
  useEffect(() => {
    handleGetImages();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      {/* <div className="h-[24px]"></div> */}
      <div className="mt-[100px] overflow-scroll ">
        {currentView === "images" ? <GetImage /> : <Albums />}
      </div>
    </div>
  );
};

export default Home;
