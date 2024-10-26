import { createSlice } from "@reduxjs/toolkit";
import { deleteImage, fetchImages, uploadImage } from "./imageAction";

const imageSlice = createSlice({
    name: 'images',
    initialState: {
        images: [],
        loading: false,
        success: false,
        error: "",
        selectedImage: {},
        title: "",
        description: "",
        isPopupOpen: false,
    },
    reducers: {
        setSelectedImage: (state, action) => {
            state.selectedImage = action.payload
        }
        ,
        clearSelectedImage: (state) => {
            state.selectedImage = null;
        },
        setTitle: (state, action) => {
            state.title = action.payload;
        },
        setDescription: (state, action) => {
            state.description = action.payload;
        },

        clearErrors: (state) => {
            state.error = null;
        },
        setPopupOpen: (state) => {
            state.isPopupOpen = true;
        },
        setPopupClose: (state) => {
            state.isPopupOpen = false;
        },
        clearSuccess: (state) => {
            state.success = false;
        }

    },
    extraReducers: (builder) => {
        // fetchImages() 
        builder
            .addCase(fetchImages.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchImages.fulfilled, (state, action) => {
                state.loading = false;
                state.images = action.payload.images;
            })
            .addCase(fetchImages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // deleteImage
            .addCase(deleteImage.fulfilled, (state, action) => {
                state.images = state.images.filter((image) => image.id !== action.payload);
            })
            .addCase(deleteImage.rejected, (state, action) => {
                state.error = action.payload;
            })
            //upload Image
            .addCase(uploadImage.pending, (state) => {
                state.loading = true;
            })
            .addCase(uploadImage.fulfilled, (state, action) => {
                state.loading = false;
                state.images.push(action.payload);
                state.success = true;
            })
            .addCase(uploadImage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    }
});

export const { setSelectedImage, clearSuccess, setPopupClose, setPopupOpen, clearErrors, clearSelectedImage, setDescription, setTitle } = imageSlice.actions;
export default imageSlice.reducer;

// states
/*
title, description, images[], img,id, currentImage,error,
success,isPopupOpen,isHovered, isEditing,
*/
// func
/*
setImages,handleDescriptionChange,handleTitleChange,
imageDelete, handleImageChange, ImageUpload,setCurrentImage, setTitle.setDescription
setIsPopupOpen,
*/