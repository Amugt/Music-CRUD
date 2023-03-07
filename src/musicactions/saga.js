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
  getMusicByIdRequest,
  getMusicByIdSuccess,
  getMusicByIdFailure,
} from "../musicactions/musicsservice";

const apiURL =
  "https://my-json-server.typicode.com/Amugt/json-placeholder/Musics";

function* fetchMusicData() {
  try {
    const response = yield call(axios.get, apiURL);
    yield put(getMusicSuccess(response.data));
  } catch (error) {
    yield put(getMusicFailure(error.message));
  }
}

function* addNewMusic(action) {
  try {
    const response = yield call(axios.post, apiURL, action.payload);
    yield put(addMusicSuccess(response.data));
  } catch (error) {
    yield put(addMusicFailure(error.message));
  }
}

function* updateExistingMusic(action) {
  try {
    const updated = action.payload;
    const id = updated[0];
    const music = updated[1];
    const response = yield call(axios.put, `${apiURL}/${id}`, music);
    yield put(updateMusicSuccess({ id, ...response.data }));
  } catch (error) {
    yield put(updateMusicFailure(error.message));
  }
}

function* deleteMusic(action) {
  try {
    yield call(axios.delete, `${apiURL}/${action.payload}`);
    yield put(deleteMusicSuccess(action.payload));
  } catch (error) {
    yield put(deleteMusicFailure(error.message));
  }
}

function* fetchMusicDataById(action) {
  try {
    const response = yield call(axios.get, `${apiURL}/${action.payload}`);
    yield put(getMusicByIdSuccess(response.data));
  } catch (error) {
    yield put(getMusicByIdFailure(error.message));
  }
}

function* musicWatcher() {
  yield takeLatest(getMusicRequest.type, fetchMusicData);
  yield takeLatest(addMusicRequest.type, addNewMusic);
  yield takeLatest(updateMusicRequest.type, updateExistingMusic);
  yield takeLatest(deleteMusicRequest.type, deleteMusic);
  yield takeLatest(getMusicByIdRequest.type, fetchMusicDataById);
}

export default musicWatcher;
