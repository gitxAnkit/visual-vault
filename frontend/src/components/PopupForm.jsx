import React, { useState } from "react";

const API_URL = `http://localhost:4500/api`;

const PopupForm = ({ isOpen, onClose, onImageUpload }) => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

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
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);

    try {
      const response = await fetch(`${API_URL}/images/upload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSuccess(true);
        console.log("Image uploaded successfully");
        // Optionally, you can reset the form fields here:
        onClose(); // Close the popup after a successful upload
        onImageUpload();
        setTitle("");
        setDescription("");
        setImage(null);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to upload image");
        console.error("Failed to upload image");
      }
    } catch (error) {
      setError("Error uploading image: " + error.message);
      console.error("Error uploading image:", error);
    }
  };

  return (
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
              onClick={onClose}
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
  );
};

export default PopupForm;
