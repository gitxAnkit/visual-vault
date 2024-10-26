import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../features/images/imageAction";
import { setPopupClose, clearSuccess } from "../features/images/imageSlice";

const PopupForm = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { isPopupOpen, error, success } = useSelector((state) => state.images);
  const dispatch = useDispatch();

  const handleImageChange = (e) => setImage(e.target.files[0]);
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);

    dispatch(uploadImage(formData));
  };

  useEffect(() => {
    if (success) {
      console.log("Image uploaded successfully");
      dispatch(setPopupClose());
      dispatch(clearSuccess()); // Reset success status
      setTitle("");
      setDescription("");
      setImage(null);
    }
  }, [success, dispatch]);

  return (
    isPopupOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Add New Image</h2>
          <form
            encType="multipart/form-data"
            method="post"
            onSubmit={handleUpload}
          >
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Choose Image:
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={handleTitleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                rows="3"
                value={description}
                onChange={handleDescriptionChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600"
                onClick={() => dispatch(setPopupClose())}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {success && (
            <p className="text-green-500 mt-4">Image uploaded successfully!</p>
          )}
        </div>
      </div>
    )
  );
};

export default PopupForm;
