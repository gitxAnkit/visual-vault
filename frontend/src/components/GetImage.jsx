import ImageCard from "./ImageCard";
import dog1 from "../assets/images/dog1.jpg";
import dog2 from "../assets/images/dog2.jpg";
import { useEffect, useState } from "react";

const API_URL = `http://localhost:4500/api/images`;

const GetImage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }
        const data = await response.json();
        setImages(data.images);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
    // console.log("Images: ", images);
  }, []);

  return (
    <div className="">
      <div
        className="text-white grid md:grid-cols-3 
        lg:grid-cols-5 sm:grid-cols-2  gap-5 "
      >
        <ImageCard img={dog1} title={"Dog"} description={"Cute puppy"} />

        {/* Map over the images array and render ImageCard for each image */}
        {images.map((image, index) => (
          <ImageCard
            key={index}
            img={image.imageUrl} // Assuming the API response includes image URLs
            title={image.title}
            description={image.description}
          />
        ))}
        {console.log("Images2: ", images)}
      </div>
    </div>
  );
};

export default GetImage;
