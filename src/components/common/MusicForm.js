import React, { useState, useEffect } from "react";
import joi from "joi";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { allmusic } from "../../musicactions/musicsservice";
import {
  addMusicRequest,
  addMusicSuccess,
  addMusicFailure,
  updateMusicRequest,
  updateMusicSuccess,
  updateMusicFailure,
  getMusicByIdRequest,
  getMusicByIdSuccess,
  getMusicByIdFailure,
} from "../../musicactions/musicsservice";

const MusicForm = () => {
  const [data, setData] = useState({ title: "", artist: "" });
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, selectedMusic } = useSelector((state) => state.music);

  useEffect(() => {
    if (id !== "new") {
      dispatch(getMusicByIdRequest(id));
      //   const { title, artist } = selectedMusic;
      //   setData({ title, artist });
      console.log(selectedMusic);

      // .catch((err) => {
      //   console.log(err);
      //   dispatch(getMusicByIdFailure(err.message));
      // });
    }
  }, [dispatch, id]);

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
        dispatch(updateMusicRequest(id, music));
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
      [name]: value,
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
  };

  return (
    <div className="Full Screen">
      {loading && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          Music details
          <div>
            <input
              type="text"
              name="title"
              className="input"
              value={data.title}
              onChange={handleChange}
            />
            {errors.title && (
              <div className="alert alert-danger">{errors.title}</div>
            )}
          </div>
          <div>
            <input
              type="text"
              name="artist"
              className="input"
              value={data.artist}
              onChange={handleChange}
            />
            {errors.artist && (
              <div className="alert alert-danger">{errors.artist}</div>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={Object.keys(errors).length > 0}
            >
              {id === "new" ? "Add Music" : "Update"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MusicForm;
