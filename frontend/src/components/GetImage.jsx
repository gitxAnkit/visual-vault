import AddImages from "./AddImages";
import ImageCard from "./ImageCard";
import { useEffect, useState } from "react";
import PopupForm from "./PopupForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchImages } from "../features/images/imageAction";
import Loader from "./Loader";
import ErrorBoundary from "../app/ErrorBoundary";
import { setPopupOpen } from "../features/images/imageSlice";

const GetImage = () => {
  const dispatch = useDispatch();
  const { images, loading, error } = useSelector((state) => state.images);

  const togglePopup = () => {
    dispatch(setPopupOpen());
  };

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <ErrorBoundary>
      <div className="">
        <div
          className="grid md:grid-cols-3 
        lg:grid-cols-5 sm:grid-cols-2 gap-5 py-4"
        >
          {images?.map((image) => (
            <ImageCard key={image._id} image={image} />
          ))}
        </div>
        <AddImages onClick={togglePopup} />
        <PopupForm />
      </div>
    </ErrorBoundary>
  );
};

export default GetImage;
