import React from 'react';

import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/ru';

import { classNames } from '../../Utillity/Utillity'
import './MovieLink.sass';

const MovieLink = ({ title, date, overview, vote, image }) => (
  <div className="movie-link">
    <div className="movie-link-container container">
        <img src={`https://image.tmdb.org/t/p/w300${image}`} alt="Poster"/>
        <div className='movie-link-text'>
          <h4>{title}</h4>
          <h5>Описание: </h5>
          <p className='overview'>{!overview.length <= 0 ? overview.slice(0, 150) + '...' : 'Описание временно отсутствует'}</p>
          <div className="vote-date">
            <p>Дата релиза: <Moment format='DD MMM YYYY'>{date}</Moment></p>
            <span className={classNames(vote)}>
              {vote.toFixed(1)}
            </span>
          </div>
        </div>
    </div>
  </div>
)

export default MovieLink;
