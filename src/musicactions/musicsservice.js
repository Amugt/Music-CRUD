import { createSlice } from "@reduxjs/toolkit";

// Redux Toolkit slice for music data
const musicSlice = createSlice({
  name: "music",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    getMusicRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getMusicSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      console.log(state.data);
    },
    getMusicFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
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
      state.error = action.payload;
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
  },
});

// Redux Toolkit actions
export const {
  getMusicRequest,
  getMusicSuccess,
  getMusicFailure,
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

export default musicSlice.reducer;
