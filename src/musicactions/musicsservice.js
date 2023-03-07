import { createSlice } from "@reduxjs/toolkit";

const musicSlice = createSlice({
  name: "music",
  initialState: {
    data: [],
    loading: false,
    error: null,
    selectedMusic: [],
  },
  reducers: {
    getMusicRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.selectedMusic = "";
    },
    getMusicSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    getMusicFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(state.error);
    },
    addMusicRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    addMusicSuccess: (state, action) => {
      state.loading = false;
      state.data.push(action.payload);
    },
    addMusicFailure: (state, action) => {
      state.loading = false;
    },
    updateMusicRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateMusicSuccess: (state, action) => {
      state.loading = false;
      state.data = state.data.map((music) =>
        music.id === action.payload.id ? action.payload : music
      );
    },
    updateMusicFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteMusicRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteMusicSuccess: (state, action) => {
      state.loading = false;
      state.data = state.data.filter((music) => music.id !== action.payload);
    },
    deleteMusicFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getMusicByIdRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getMusicByIdSuccess: (state, action) => {
      state.loading = false;
      state.selectedMusic = action.payload;
    },
    getMusicByIdFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getMusicRequest,
  getMusicSuccess,
  getMusicFailure,
  getMusicByIdRequest,
  getMusicByIdSuccess,
  getMusicByIdFailure,
  addMusicRequest,
  addMusicSuccess,
  addMusicFailure,
  updateMusicRequest,
  updateMusicSuccess,
  updateMusicFailure,
  deleteMusicRequest,
  deleteMusicSuccess,
  deleteMusicFailure,
} = musicSlice.actions;

export const allmusic = (state) => state.music;

export default musicSlice.reducer;
