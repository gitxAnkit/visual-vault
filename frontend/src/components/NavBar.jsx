import React from "react";

const NavBar = (props) => {
  return (
    <div className="h-[100px] bg-gray-400 flex justify-center items-center">
      <div className="w-[50%] flex justify-center items-center text-white font-bold text-lg">
        <span
          className="mx-4 cursor-pointer"
          onClick={() => {
            props.fetchImages(); // Call the function directly
          }}
        >
          All pictures
        </span>
        <span
          className="mx-4 cursor-pointer"
          onClick={() => {
            props.handleGetAlbums();
          }}
        >
          Albums
        </span>
      </div>
    </div>
  );
};

export default NavBar;
