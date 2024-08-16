import React from "react";
import AlbumCard from "./AlbumCard";

const Albums = () => {
  return (
    <div className="min-h-full flex items-center justify-center">
      <div className="w-[80%] grid lg:grid-cols-4 md:grid-cols-3 p-2">
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
      </div>
    </div>
  );
};

export default Albums;
