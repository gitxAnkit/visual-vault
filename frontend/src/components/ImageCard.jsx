import { useState } from "react";
import { RiImageEditLine, RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import ErrorBoundary from "../app/ErrorBoundary";
import {
  setSelectedImage,
  setDescription,
  setTitle,
} from "../features/images/imageSlice";

const ImageCard = ({ image }) => {
  const dispatch = useDispatch();

  const { images, selectedImage, title, description } = useSelector(
    (state) => state.images
  );

  // const handleKeyDown = (event, updateFunction) => {
  //   if (event.key === "Enter") {
  //     updateFunction(id);
  //     setIsEditing(false);
  //   }
  // };

  return (
    <ErrorBoundary>
      <div
        className="bg-gray-200 md:max-w-[400px] max-w-[440px] relative"
        // onMouseEnter={() => setIsHovered(true)}
        // onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={image.url}
          alt="Image"
          className="md:max:h-[320px] h-[320px] w-full"
        />

        <div className="text-xl p-2">
          <span className="font-bold text-black">{image.title}</span>
          <p className="text-gray font-light">{image.description}</p>
        </div>
        {/* 
        {isHovered && (
          <div className="absolute top-2 right-2 space-x-2 transition-opacity duration-300">
            <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
              <RiImageEditLine />
            </button>
            <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ">
              <RiDeleteBin6Line />
            </button>
          </div>
        )} */}
      </div>
    </ErrorBoundary>
  );
};

export default ImageCard;
