import React, { useEffect, useRef, useState } from "react";
import { RiImageEditLine, RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import ErrorBoundary from "../app/ErrorBoundary";
import {
  deleteImage,
  updateDescription,
  updateTitle,
} from "../features/images/imageAction";

const ImageCard = ({ image }) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(image.title);
  const [newDescription, setNewDescription] = useState(image.description);
  const cardRef = useRef(null);

  const handleDelete = () => {
    dispatch(deleteImage(image._id));
  };

  const toggleEditing = () => {
    setEditing(!editing);
  };

  const handleTitleUpdate = () => {
    dispatch(updateTitle({ imageId: image._id, newTitle }));
  };

  const handleDescriptionUpdate = () => {
    dispatch(updateDescription({ imageId: image._id, newDescription }));
  };

  // Detect clicks outside the component to trigger updates
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        editing &&
        cardRef.current &&
        !cardRef.current.contains(event.target)
      ) {
        handleTitleUpdate();
        handleDescriptionUpdate();
        setEditing(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editing, newTitle, newDescription]);

  return (
    <ErrorBoundary>
      <div
        ref={cardRef}
        className="bg-gray-200 md:max-w-[400px] max-w-[440px] relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Display image */}
        <img
          src={image.url}
          alt={image.title}
          className="md:max-h-[320px] h-[320px] w-full object-cover"
        />

        {/* Display title and description */}
        {editing ? (
          <div className="text-xl p-2">
            <input
              className="font-bold text-black"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <input
              className="text-gray-600 font-light"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>
        ) : (
          <div className="text-xl p-2">
            <span className="font-bold text-black">{newTitle}</span>
            <p className="text-gray-600 font-light">{newDescription}</p>
          </div>
        )}
        {/* Edit and Delete Icons, visible on hover */}
        {isHovered && (
          <div className="absolute top-2 right-2 space-x-2">
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              onClick={toggleEditing}
            >
              <RiImageEditLine />
            </button>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              onClick={handleDelete}
            >
              <RiDeleteBin6Line />
            </button>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default ImageCard;
