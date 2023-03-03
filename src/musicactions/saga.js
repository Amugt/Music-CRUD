import { put, call, takeLatest } from "redux-saga/effects";

import axios from "axios";
import {
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
} from "../musicactions/musicsservice";

const apiURL = "http://localhost:3004/Musics";

// Redux Saga generator function for fetching music data
function* fetchMusicData() {
  try {
    const response = yield call(axios.get, apiURL);
    yield put(getMusicSuccess(response.data));
  } catch (error) {
    yield put(getMusicFailure(error.message));
  }
}

// Redux Saga generator function for adding new music
function* addNewMusic(action) {
  try {
    yield put(addMusicRequest());
    const response = yield call(axios.post, apiURL, action.payload);
    yield put(addMusicSuccess(response.data));
  } catch (error) {
    yield put(addMusicFailure(error.message));
  }
}

// Redux Saga generator function for updating existing music
function* updateExistingMusic(action) {
  try {
    yield put(updateMusicRequest());
    const response = yield call(
      axios.put,
      `${apiURL}/${action.payload.id}`,
      action.payload.data
    );
    yield put(updateMusicSuccess(response.data));
  } catch (error) {
    yield put(updateMusicFailure(error.message));
  }
}

// Redux Saga generator function for deleting music
function* deleteMusic(action) {
  try {
    yield put(deleteMusicRequest());
    yield call(axios.delete, `${apiURL}/${action.payload}`);
    yield put(deleteMusicSuccess(action.payload));
  } catch (error) {
    yield put(deleteMusicFailure(error.message));
  }
}

// Watcher saga to listen for Redux actions
function* musicWatcher() {
  yield takeLatest(getMusicRequest.type, fetchMusicData);
  yield takeLatest(addMusicRequest.type, addNewMusic);
  yield takeLatest(updateMusicRequest.type, updateExistingMusic);
  yield takeLatest(deleteMusicRequest.type, deleteMusic);
}

export default musicWatcher;
