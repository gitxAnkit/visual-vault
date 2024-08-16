import { useState } from "react";
import { RiImageEditLine, RiDeleteBin6Line } from "react-icons/ri";

const ImageCard = ({
  img,
  id,
  title,
  description,
  handleDescriptionUpdate,
  handleTitleUpdate,
  onDelete,
  setImages,
  images,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const handleKeyDown = (event, updateFunction) => {
    if (event.key === "Enter") {
      updateFunction(id);
      setIsEditing(false);
    }
  };

  return (
    <div
      className="bg-gray-200 md:max-w-[400px] max-w-[440px] relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={img}
        alt="Image"
        className="md:max:h-[320px] h-[320px] w-full"
      />

      <div className="text-xl p-2">
        {isEditing ? (
          <>
            <input
              type="text"
              value={newTitle}
              onBlur={() => {
                handleTitleUpdate(id, newTitle, setImages, images);
                setIsEditing(false);
              }}
              onKeyDown={(e) =>
                handleKeyDown(e, handleTitleUpdate, setImages, images)
              }
              onChange={(e) => {
                setNewTitle(e.target.value);
              }}
              className="mb-2 p-1"
            />
            <input
              type="text"
              value={newDescription}
              onBlur={() => {
                handleDescriptionUpdate(id, newDescription, setImages, images);
                setIsEditing(false);
              }}
              onKeyDown={(e) =>
                handleKeyDown(e, () => {
                  handleDescriptionUpdate(
                    id,
                    newDescription,
                    setImages,
                    images
                  );
                })
              }
              onChange={(e) => {
                setNewDescription(e.target.value);
              }}
              className="p-1"
            />
          </>
        ) : (
          <>
            <span className="font-bold text-black">{newTitle}</span>
            <p className="text-gray font-light">{newDescription}</p>
          </>
        )}
      </div>

      {isHovered && (
        <div className="absolute top-2 right-2 space-x-2 transition-opacity duration-300">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
          >
            <RiImageEditLine />
          </button>
          <button
            onClick={() => onDelete(id, setImages, images)}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 "
          >
            <RiDeleteBin6Line />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageCard;
