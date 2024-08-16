import ImageCard from "./ImageCard";
import { useEffect, useState } from "react";

const API_URL = `http://localhost:4500/api/images`;

const GetImage = ({ onDelete, handleTitleUpdate, handleDescriptionUpdate }) => {
  const [images, setImages] = useState([]);

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
    </div>
  );
};

export default GetImage;
