const ImageCard = (props) => {
  return (
    <div className="bg-[#a89984] md:max-w-[400px] max-w-[440px] ">
      <img
        src={props.img}
        alt="Image"
        className="md:max:h-[320px] h-[320px] w-full "
      />
      <div className="text-xl p-2">
        <span className="font-bold text-black">{props.title}</span>
        <p className="text-gray font-light">{props.description}</p>
      </div>
    </div>
  );
};

export default ImageCard;
