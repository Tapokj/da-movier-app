import React from 'react';
import './Characters.sass';
import errorImage from '../../../assets/profile-image-150x150.png'

const Character = ({ image, name, character }) => (
  <div className='character-list'>
      <img className='character-img' src={`https://image.tmdb.org/t/p/w200${image}`} alt="Profile" onError={(e) => e.target.onerror = e.target.src = errorImage}/>
      <h5>{name}</h5>
      <p>{character}</p>
  </div>
);

export default Character;
