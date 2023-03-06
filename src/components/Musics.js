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
    console.log(originalData);
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
        <div className="Add-music">
          <Link to="/musics/new">
            <button>Add new Music</button>
          </Link>
        </div>
        <div className="musics-container" component="div">
          {musics.map((music, index) => {
            return (
              <div className="music" key={music.id}>
                <h6>{index + 1}</h6>
                <h5>{music.title}</h5>
                <h5>{music.artist}</h5>
                <div>
                  <Link to={`/musics/${music.id}`}>
                    <button>edit</button>
                  </Link>
                </div>
                <div>
                  <button onClick={() => this.deletingMusic(music.id)}>
                    {" "}
                    delete
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
  musics: allmusic(state).data, // select the music data from the state
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
