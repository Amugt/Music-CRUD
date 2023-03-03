import { configureStore } from "@reduxjs/toolkit";
import musicReducer from "./musicactions/musicsservice";
import createSagaMiddleware from "redux-saga";
import musicWatcher from "./musicactions/saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: musicReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(musicWatcher);

export default store;
