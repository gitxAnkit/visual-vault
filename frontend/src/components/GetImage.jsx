import ImageCard from "./ImageCard";

const GetImage = () => {
  return (
    <div className="text-white">
      Get Images
      <div className="text-white flex">
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
      </div>
    </div>
  );
};

export default GetImage;
