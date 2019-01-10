import React, { Component } from 'react';

import { Link, withRouter } from 'react-router-dom';

import './SideProfileMovie.sass';

class SideProfileMovie extends Component {

  render(){
    return (
      <div className='render-user-list'>
        <div className='list-overv' style={{ 'display' : this.props.data ? 'flex' : 'none' }}>
          <p>Последние добавленные...</p>
          <i onClick={this.props.clicked} className="fas fa-times close-list"></i>
        </div>
        {this.props.data ? this.props.data.slice(0, 6).map(movie => {
          return (
            <Link to={`/movie/${movie.id}`} replace className='image-title' key={movie.id}>
              <div>
                <h4>{movie.title}</h4>
                <p>{movie.overview.slice(0, 30) + '...'}</p>
              </div>
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="PosterMovie"/>
            </Link>
          )
          }) : null}
      </div>
    )
  }
};

export default withRouter(SideProfileMovie);
