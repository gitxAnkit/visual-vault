import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "../features/images/imageSlice";
// import albumReducer from "../features/albumSlice";

const store = configureStore({
    reducer: {
        images: imageReducer,
        // album: albumReducer,
    },

});

export default store;