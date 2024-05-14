const ImageCard = (props) => {
  return (
    <div className="bg-[#a89984] md:max-w-[400px] max-w-[440px] h-[380px]">
      <img
        src={props.img}
        alt="Image"
        className="md:max:h-[320px] h-[320px] w-full "
      />
      <div className="text-xl">
        <span className="font-bold">{props.title}</span>
        <p>{props.description}</p>
      </div>
    </div>
  );
};

export default ImageCard;
