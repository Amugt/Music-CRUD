import React, { useState, useEffect } from "react";
import joi from "joi";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import "./MusicForm.css";

import {
  addMusicRequest,
  addMusicFailure,
  updateMusicRequest,
  updateMusicFailure,
  getMusicByIdRequest,
} from "../../musicactions/musicsservice";

const MusicForm = () => {
  const [data, setData] = useState({ title: "", artist: "", genre: "" });

  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, selectedMusic } = useSelector((state) => state.music);

  useEffect(() => {
    if (id !== "new") {
      dispatch(getMusicByIdRequest(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedMusic) {
      const { title, artist, genre } = selectedMusic;
      setData({ title, artist, genre });
    }
  }, [selectedMusic]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    const music = {
      ...data,
    };

    try {
      if (id === "new") {
        dispatch(addMusicRequest(music));
      } else {
        const updated = [id, music];
        dispatch(updateMusicRequest(updated));
      }

      navigate("/musics");
    } catch (error) {
      console.log(error);
      if (id === "new") {
        dispatch(addMusicFailure(error));
      } else {
        dispatch(updateMusicFailure(error));
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value || "",
    }));
  };

  const validate = () => {
    const { error } = joi.object(schema).validate(data, { abortEarly: false });
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const schema = {
    title: joi.string().required(),
    artist: joi.string().required(),
    genre: joi.string().required(),
  };

  const genreOptions = [
    { value: "African", label: "African" },
    { value: "Blues", label: "Blues" },
    { value: "Electronic", label: "Electronic" },
    { value: "Ethiopian", label: "Ethiopian" },
    { value: "Jazz", label: "Jazz" },
    { value: "Pop", label: "Pop" },
    { value: "Rap", label: "Rap" },
    { value: "reggae", label: "reggae" },
    { value: "Rock", label: "Rock" },
    { value: "Other", label: "Other" },
  ];

  return (
    <div className="Full-Screen">
      <div>
        {loading && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            Enter Music details
            <div>
              <input
                type="text"
                name="title"
                className="input"
                placeholder="Enter Music title here"
                value={data.title}
                onChange={handleChange}
              />
              {errors.title && <div className="">{errors.title}</div>}
            </div>
            <div>
              <input
                type="text"
                name="artist"
                className="input"
                placeholder="Enter Artist Name here"
                value={data.artist}
                onChange={handleChange}
              />
              {errors.artist && <div className="">{errors.artist}</div>}
            </div>
            <div>
              <select
                id="genre"
                name="genre"
                className="form-select"
                value={data.genre}
                onChange={handleChange}
                required
              >
                <option>Select Genre</option>
                {genreOptions.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.genre && (
                <div className="alert alert-danger">{errors.genre}</div>
              )}
            </div>
            <button
              type="submit"
              className="Add-Update-btn"
              disabled={Object.keys(errors).length > 0}
            >
              {id === "new" ? "Add Music" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MusicForm;
