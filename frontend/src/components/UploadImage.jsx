import { useState } from "react";
const API_URL = `http://localhost:4500/api/images`;
const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    console.log("Image:", image);
    console.log("Title:", title);
    console.log("Description:", description);

    // Create a new FormData object
    const formData = new FormData();

    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);

    try {
      // Send a POST request to the backend API endpoint
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Image uploaded successfully");
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  return (
    <div
      className="bg-[#458588] w-[500px] sm:w-[600px] md:w-[740px]
     p-3 m-auto min-h-[30vh] text-white"
    >
      <form
        encType="multipart/form-data"
        className="font-semibold text-xl "
        method="post"
        onSubmit={handleUpload}
      >
        <div className="m-5 md:flex">
          <h4 className="text-xl">Choose Image:</h4>
          <input
            className="bg-[#d79921] rounded-md shadow-inner w-[290px] ml-2"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <div className="m-5 md:flex">
          <h4 className="">Title:</h4>
          <input
            className="bg-[#d79921] ml-2 rounded-md shadow-inner"
            type="text"
            name="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div className="md:flex m-5">
          <h2 className="">Description:</h2>
          <textarea
            className="bg-[#d79921] ml-2 rounded-md shadow-inner"
            name="description"
            rows="3"
            value={description}
            onChange={handleDescriptionChange}
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
