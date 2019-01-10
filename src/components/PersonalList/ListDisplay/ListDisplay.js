import React from 'react';

import { classNames } from '../../../Utillity/Utillity';

// Styles & CSS
import './ListDispaly.sass';

const ListDispaly = ({ title, image, overview, release_date, vote_average }) => (
  <div className='list-display'>
    <div className='list-item'>
      <div>
        <img src={`https://image.tmdb.org/t/p/w300${image}`} alt="Poster"/>
      </div>
      <div>
        <h3>{title}</h3>
        <p className='overview'>{overview.slice(0, 250) + '...'}</p>
      </div>
      <p className={`${classNames(vote_average)} vote`}>{vote_average.toFixed(1)}</p>
    </div>
  </div>
);

export default ListDispaly;
