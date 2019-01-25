import React from 'react';

import { Link } from 'react-router-dom';
import './MainPageDisplay.sass';

const MainPageDisplay = ({ data, nameData, link }) => (
  <div className='data-container'>
    <Link to={`/${link}/page/${1}`}><h3>{nameData}</h3></Link>
    <div className="data-here">
      {data ? data.map(element => {
        return (
          <Link className='data-link' key={element.id} to={`/movie/${element.id}`}>
            <img src={`https://image.tmdb.org/t/p/w500/${element.poster_path}`} alt="PosterPopMovie"/>
            <div className="data-info">
              <h4>{element.title}</h4>
              <p>{element.title.length <= 20 ?  element.original_title : null}</p>
            </div>
          </Link>
        )
      }) : null}
    </div>
  </div>
);

export default MainPageDisplay;
