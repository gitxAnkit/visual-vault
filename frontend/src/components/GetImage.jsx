import AddImages from "./AddImages";
import ImageCard from "./ImageCard";
import { useEffect, useState } from "react";
import PopupForm from "./PopupForm";

const API_URL = `http://localhost:4500/api/images`;

const GetImage = ({ onDelete, handleTitleUpdate, handleDescriptionUpdate }) => {
  const [images, setImages] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  const handleImageUpload = async () => {
    // Logic to re-fetch or re-render the images after upload
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }
      const data = await response.json();
      setImages(data.images); // Set images here
      console.log(data.images);
    } catch (error) {
      console.error("Error re-fetching images:", error);
    }
  };
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }
        const data = await response.json();
        setImages(data.images); // Set images here
        console.log(data.images);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="">
      <div
        className=" grid md:grid-cols-3 
        lg:grid-cols-5 sm:grid-cols-2 gap-5 py-4"
      >
        {images.map((image, index) => (
          <ImageCard
            key={index}
            img={image.url}
            title={image.title}
            description={image.description}
            onDelete={onDelete}
            id={image._id}
            setImages={setImages}
            images={images}
            handleDescriptionUpdate={handleDescriptionUpdate}
            handleTitleUpdate={handleTitleUpdate} // Corrected typo
          />
        ))}
      </div>
      <AddImages onClick={togglePopup} />
      <PopupForm
        isOpen={isPopupOpen}
        onClose={togglePopup}
        onImageUpload={handleImageUpload}
      />
    </div>
  );
};

export default GetImage;
