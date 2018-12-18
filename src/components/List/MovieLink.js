import React from 'react';

import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/ru';

import './MovieLink.sass';

const MovieLink = ({ title, date, overview, vote, image }) => {

  const classNames = () => {
    if (vote.toFixed(1) <= 5 ) {
      return 'red_vote'
    }

    else if (vote.toFixed(1) > 5 && vote.toFixed(1) <= 6.9 ) {
      return 'yellow_vote'
    }

    else if (vote.toFixed(1) >= 7 && vote.toFixed(1) <= 10) {
      return 'green_vote'
    }
  }

  return (
    <div className="movie-link">
      <div className="row container">
          <img src={`https://image.tmdb.org/t/p/w300${image}`} alt="Poster"/>

          <div className='movie-link-text'>
            <h4>{title}</h4>
            <h5>Описание: </h5>
            <p className='overview'>{!overview.length <= 0 ? overview.slice(0, 150) + '...' : 'Описание временно отсутствует'}</p>
            <div className="vote-date">
              <p>Дата релиза: <Moment format='DD MMM YYYY'>{date}</Moment></p>
              <span className={classNames()}>
                {vote.toFixed(1)}
              </span>
            </div>
          </div>
      </div>
    </div>
  )

}

export default MovieLink;
