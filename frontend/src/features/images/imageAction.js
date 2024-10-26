import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../app/api";

export const fetchImages = createAsyncThunk(
    'images/fetchImages',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get("/images");
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const deleteImage = createAsyncThunk(
    'images/deleteImage',
    async (imageId, { rejectWithValue }) => {
        try {
            await api.delete(`/images/${imageId}`);
            return imageId;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);
export const uploadImage = createAsyncThunk(
    'images/uploadImage',
    async (imageData, { rejectWithValue }) => {
        try {
            const response = await api.post("/images/", imageData);
            return response.data.image;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to upload image');
        }
    }
);

