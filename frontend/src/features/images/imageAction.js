import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../app/api";

// Fetch all images
export const fetchImages = createAsyncThunk(
    'images/fetchImages',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get("/images");
            return data;
        } catch (error) {
            const errorMessage = error.response?.data?.message ||
                error.message || 'Failed to fetch images';
            return rejectWithValue(errorMessage);
        }
    }
);

// Upload new image
export const uploadImage = createAsyncThunk(
    'images/uploadImage',
    async (imageData, { rejectWithValue }) => {
        try {

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            };

            const response = await api.post("/images/", imageData, config);

            if (!response.data || !response.data.image) {
                throw new Error('Invalid response from server');
            }

            return {
                image: response.data.image,
                message: response.data.message || 'Image uploaded successfully'
            };
        } catch (error) {
            let errorMessage;
            if (error.response) {
                errorMessage = error.response.data?.message;
            } else if (error.request) {
                errorMessage = 'No response from server';
            } else {
                errorMessage = error.message;
            }

            return rejectWithValue(errorMessage || 'Failed to upload image');
        }
    }
);
// Delete an image
export const deleteImage = createAsyncThunk(
    'images/deleteImage',
    async (imageId, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/image/${imageId}`);
            return {
                imageId,
                message: response.data?.message,
            };
        } catch (error) {
            const errorMessage = error.response?.data?.message ||
                error.message || 'Failed to delete image';
            return rejectWithValue(errorMessage);
        }
    }
);
// Update title
export const updateTitle = createAsyncThunk(
    'images/updateImageTitle',
    async ({ imageId, newTitle }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/image/${imageId}/title`, { newTitle: newTitle });
            return {
                imageId,
                newTitle,
                message: response.data?.message,
            };
        } catch (error) {
            const errorMessage = error.response?.data?.message ||
                error.message || 'Failed to update image title';
            return rejectWithValue(errorMessage);
        }
    }
);
// Update description
export const updateDescription = createAsyncThunk(
    'images/updateImageDescription',
    async ({ imageId, newDescription }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/image/${imageId}/description`, { newDescription: newDescription });
            return {
                imageId,
                newDescription,
                message: response.data?.message,
            };
        } catch (error) {
            const errorMessage = error.response?.data?.message ||
                error.message || 'Failed to update image description';
            return rejectWithValue(errorMessage);
        }
    }
);