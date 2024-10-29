import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../features/images/imageAction";
import { setPopupClose, clearSuccess } from "../features/images/imageSlice";
import ErrorBoundary from "../app/ErrorBoundary";

const PopupForm = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const { error, success, loading } = useSelector((state) => state.images);
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else if (file) {
      alert("Please select an image file");
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please drop an image file");
    }
  };

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);

    dispatch(uploadImage(formData));
  };

  const handleCancel = () => {
    setImage(null);
    setPreview(null);
    setTitle("");
    setDescription("");
    dispatch(setPopupClose());
  };

  useEffect(() => {
    if (success) {
      console.log("Image uploaded successfully");
      dispatch(setPopupClose());
      dispatch(clearSuccess());
      setTitle("");
      setDescription("");
      setImage(null);
      setPreview(null);
    }
  }, [success, dispatch]);

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch({ type: "images/clearError" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  return (
    <ErrorBoundary>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Add New Image</h2>
          <form
            encType="multipart/form-data"
            method="post"
            onSubmit={handleUpload}
            onDragEnter={handleDrag}
          >
            {/* Image Preview */}
            {preview && (
              <div className="mb-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}

            {/* Drag & Drop Zone */}
            <div
              className={`mb-4 relative ${
                dragActive ? "border-blue-500" : "border-gray-300"
              } border-2 border-dashed rounded-lg p-4`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
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
              <p className="text-sm text-gray-500 mt-2">
                Or drag and drop an image here
              </p>
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
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white px-4 py-2 rounded`}
              >
                {loading ? "Uploading..." : "Submit"}
              </button>
            </div>
          </form>

          {error && (
            <p className="text-red-500 mt-4 text-sm bg-red-50 p-2 rounded">
              {error}
            </p>
          )}

          {success && (
            <p className="text-green-500 mt-4 text-sm bg-green-50 p-2 rounded">
              Image uploaded successfully!
            </p>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default PopupForm;
