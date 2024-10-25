import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import GetImage from "./GetImage";
import Albums from "./Albums";
import AddImages from "./AddImages";
const API_URL = `http://localhost:4500/api/images`;

const Home = () => {
  const [currentView, setCurrentView] = useState("images");
  const handleGetImages = () => {
    setCurrentView("images");
  };

  const handleGetAlbums = () => {
    setCurrentView("albums");
  };

  const onDelete = async (imageId, setImages, images) => {
    try {
      const response = await fetch(`${API_URL}/delete/${imageId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete image: ${response.statusText}`);
      }

      // Update the images state to trigger re-render
      setImages(images.filter((image) => image._id !== imageId));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleTitleUpdate = async (imageId, newTitle, setImages, images) => {
    try {
      const response = await fetch(`${API_URL}/update/title/${imageId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newTitle: newTitle,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update title: ${response.statusText}`);
      }
      // Update the images state to reflect changes
      setImages(
        images.map((image) =>
          image._id === imageId ? { ...image, title: newTitle } : image
        )
      );
      console.log("Image title updated successfully");
    } catch (error) {
      console.error("Error updating image title:", error);
    }
  };

  const handleDescriptionUpdate = async (
    imageId,
    newDescription,
    setImages,
    images
  ) => {
    try {
      const response = await fetch(`${API_URL}/update/description/${imageId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newDescription: newDescription,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update description: ${response.statusText}`);
      }

      // Update the images state to reflect changes
      setImages(
        images.map((image) =>
          image._id === imageId
            ? { ...image, description: newDescription }
            : image
        )
      );
      console.log("Image description updated successfully");
    } catch (error) {
      console.error("Error updating image description:", error);
    }
  };

  // Load images by default when component mounts
  useEffect(() => {
    handleGetImages();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <NavBar fetchImages={handleGetImages} handleGetAlbums={handleGetAlbums} />
      {/* <div className="h-[24px]"></div> */}
      <div className="mt-[100px] overflow-scroll ">
        {currentView === "images" ? (
          <GetImage
            onDelete={onDelete}
            handleTitleUpdate={handleTitleUpdate}
            handleDescriptionUpdate={handleDescriptionUpdate}
          />
        ) : (
          <Albums />
        )}
      </div>
    </div>
  );
};

export default Home;
