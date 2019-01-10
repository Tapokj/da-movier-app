import React from 'react';

const AddToList = ({ clicked }) => (
  <div onClick={clicked} className='add-movie-list'>
    <i className="fas fa-plus add-movie"></i>
    <p>Добавить фильм</p>
  </div>
)

export default AddToList;
