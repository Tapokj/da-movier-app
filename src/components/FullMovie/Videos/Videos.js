import React, { Component } from 'react';

import { connect }    from 'react-redux';
import * as actions   from '../../../store/actions';
import { withRouter } from 'react-router-dom';
// Styles & CSS
import './Videos.sass';


class Video extends Component {

  componentDidMount(){
    const paramsId = this.props.match.params.id;

    if ( paramsId ) {
      this.props.onLoadVideo(paramsId)
    }
  }

  render() {
    return (
      <div className="video-block">
        <p>Видео</p>
        <div className='video'>
          {this.props.video ? this.props.video.map(element => {
            return (
              <div key={element.id}>
              <iframe src={`https://www.youtube.com/embed/${element.key}`}
                title={element.id}
                allowFullScreen='allowFullScreen'
                frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;" ></iframe>
              </div>
            )
          }) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading : state.movie.loading,
    video   : state.movie.video
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadVideo: (movie) => dispatch(actions.doLoadVideo(movie))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Video));
