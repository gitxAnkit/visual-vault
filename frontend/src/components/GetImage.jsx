import ImageCard from "./ImageCard";
import dog1 from "../assets/images/dog1.jpg";
import dog2 from "../assets/images/dog2.jpg";
const GetImage = () => {
  return (
    <div className="text-white">
      Get Images
      <div
        className="text-white grid md:grid-cols-3 
        lg:grid-cols-5 sm:grid-cols-2  gap-5 "
      >
        <ImageCard img={dog1} title={"Dog"} description={"Cute puppy"} />
        <ImageCard img={dog2} title={"Dog"} description={"Cute puppy"} />
        <ImageCard img={dog1} title={"Dog"} description={"Cute puppy"} />
        <ImageCard img={dog2} title={"Dog"} description={"Cute puppy"} />
        <ImageCard img={dog1} title={"Dog"} description={"Cute puppy"} />
        <ImageCard img={dog1} title={"Dog"} description={"Cute puppy"} />
        <ImageCard img={dog2} title={"Dog"} description={"Cute puppy"} />
        <ImageCard img={dog1} title={"Dog"} description={"Cute puppy"} />
        <ImageCard img={dog2} title={"Dog"} description={"Cute puppy"} />
        <ImageCard img={dog1} title={"Dog"} description={"Cute puppy"} />
      </div>
    </div>
  );
};

export default GetImage;
