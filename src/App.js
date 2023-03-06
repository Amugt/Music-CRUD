import React from "react";
import { Routes, Route } from "react-router-dom";
import Musics from "./components/Musics";
import MusicForm from "./components/common/MusicForm";
import NotFound from "./components/common/NotFound";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/musics/:id" element={<MusicForm />} />
      <Route path="/musics" element={<Musics />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="/" element={<Musics />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
