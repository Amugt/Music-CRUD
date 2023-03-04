import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

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
  componentDidMount() {
    const { getMusicRequest } = this.props;
    getMusicRequest();
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.musics !== this.props.musics;
  }

  deletingMusic = async (id) => {
    const { deleteMusicRequest, deleteMusicSuccess, deleteMusicFailure } =
      this.props;
    const originalData = [...this.props.musics];
    deleteMusicRequest();
    try {
      const musics = originalData.filter((music) => music.id !== id);
      deleteMusicSuccess(id);
      await deleteMusicRequest(id);
    } catch (error) {
      console.log(error);
      deleteMusicFailure(error.message);
      // Instead of using this.setState, dispatch an action to update the state
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
  musics: state.music ? state.music.data : [],
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
