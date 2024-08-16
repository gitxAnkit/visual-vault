import React from "react";
import { RiImageAddLine } from "react-icons/ri";

const AddImages = ({ onClick }) => {
  return (
    <div className="fixed bottom-2 right-2">
      <button
        onClick={onClick}
        className="bg-blue-300 h-[52px] w-[52px] flex items-center justify-center rounded-full shadow-lg"
      >
        <RiImageAddLine size={36} />
      </button>
    </div>
  );
};

export default AddImages;
