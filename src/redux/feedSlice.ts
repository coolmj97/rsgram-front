import { createSlice } from '@reduxjs/toolkit';

export interface FeedState {
  photos: {
    url: string;
    id: string;
  }[];
  content: string;
}

const initialState: FeedState = {
  photos: [],
  content: '',
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setPhoto: (state, action) => {
      state.photos = [...state.photos, action.payload];
    },
    setContent: (state, action) => {
      state.content = action.payload;
    },
    deletePhoto: (state, action) => {
      const filteredPhotos = state.photos.filter((photo) => photo.id !== action.payload);
      state.photos = filteredPhotos;
    },
    resetForm: (state) => {
      state = initialState;
    },
  },
});

export const { setPhoto, setContent, deletePhoto, resetForm } = feedSlice.actions;

export default feedSlice.reducer;
