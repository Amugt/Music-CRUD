import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import musicReducer from "./musicactions/musicsservice";
import createSagaMiddleware from "redux-saga";
import musicWatcher from "./musicactions/saga";

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

const rootReducer = combineReducers({
  music: musicReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware,
});

sagaMiddleware.run(musicWatcher);

export default store;
