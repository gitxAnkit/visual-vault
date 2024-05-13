const UploadImage = () => {
  return (
    <div className="bg-[#458588] w-[720px] p-3 m-auto min-h-[30vh] text-white">
      <form enctype="multipart/form-data" className="font-semibold text-xl ">
        <div className="m-5">
          <label className="text-xl">Choose Image:</label>
          <input
            className="bg-[#b16286] rounded-md shadow-inner"
            type="file"
            name="image"
            accept="image/*"
            required
          />
        </div>
        <div className="m-5">
          <label className="" for="title">
            Title:
          </label>
          <input
            className="bg-[#b16286] ml-2 rounded-md shadow-inner"
            type="text"
            name="title"
            required
          />
        </div>
        <div className="flex m-5">
          <h2 className="">Description:</h2>
          <textarea
            className="bg-[#b16286] ml-2 rounded-md shadow-inner"
            name="description"
            rows="3"
            required
          ></textarea>
        </div>
        <div className="mt-10 flex justify-center">
          <button
            className="bg-[#cc241d] p-2 w-[120px] rounded-md shadow-inner border-none"
            type="submit"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadImage;
