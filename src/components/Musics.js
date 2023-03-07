import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { allmusic } from "../musicactions/musicsservice";

import {
  getMusicRequest,
  getMusicSuccess,
  getMusicFailure,
  deleteMusicRequest,
  deleteMusicSuccess,
  deleteMusicFailure,
} from "../musicactions/musicsservice";
import styled from "styled-components";
import "./Musics.css";

class Musics extends Component {
  async componentDidMount() {
    await this.props.getMusicRequest();
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.musics !== this.props.musics;
  }

  deletingMusic = async (id) => {
    const originalData = [...this.props.musics];

    this.props.deleteMusicRequest(id);
    try {
      const delmusic = originalData.filter((music) => music.id !== id);
    } catch (error) {
      console.log(error);
      this.props.deleteMusicFailure(error.message);
      this.props.getMusicSuccess(originalData);
    }
  };

  render() {
    const { musics } = this.props;

    return (
      <div className="container">
        <div class="navbar"> Music CRUD</div>
        <div className="header">Playlists</div>

        <div className="musics-container">
          <div className="add-music">
            <div>
              <Link to="/musics/new">
                <div class="Add-Svg">
                  <svg
                    fill="white"
                    viewBox="0 0 1920 1920"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M915.744 213v702.744H213v87.842h702.744v702.744h87.842v-702.744h702.744v-87.842h-702.744V213z"
                        fill-rule="evenodd"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
                <div className="Add-New">Add New</div>
              </Link>
            </div>
          </div>

          {musics.map((music, index) => {
            return (
              <div className="music" key={music.id}>
                <div className="music-info">
                  <img
                    src={`${process.env.PUBLIC_URL}/covers/${music.genre}.png`}
                    alt="Music cover"
                  />

                  <div className="music-title"> {music.title}</div>
                  <div className="artist-name">{music.artist} </div>
                </div>

                <div className="btn-container">
                  <div>
                    <Link to={`/musics/${music.id}`}>
                      <button className="edit-btn">Edit</button>
                    </Link>
                  </div>
                  <div>
                    <button
                      className="delete-btn"
                      onClick={() => this.deletingMusic(music.id)}
                    >
                      {" "}
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="divider"></div>
        <div className="header">Music List By Artist</div>
        <div className="music-list-container">
          {musics.map((music, index) => {
            return (
              <div className="music-list" key={music.id}>
                <div className="music-list-img">
                  <img
                    src={`${process.env.PUBLIC_URL}/covers/${music.genre}.png`}
                    alt="Music cover"
                  />
                </div>
                <div className="Artist">{music.artist}</div>
                <div className="Title">{music.title} </div>

                <div>
                  <Link to={`/musics/${music.id}`}>
                    <button className="edit-list">Edit</button>
                  </Link>
                </div>
                <div>
                  <button
                    className="delete-list"
                    onClick={() => this.deletingMusic(music.id)}
                  >
                    {" "}
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  musics: allmusic(state).data,
});

const mapDispatchToProps = {
  getMusicRequest,
  getMusicSuccess,
  getMusicFailure,
  deleteMusicRequest,
  deleteMusicSuccess,
  deleteMusicFailure,
};

export default connect(mapStateToProps, mapDispatchToProps)(Musics);
