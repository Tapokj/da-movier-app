import React  from 'react';
import numeral from 'numeral';
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/ru';
// styles & CSS
import './DataInfo.sass';

const DataInfo = ({ year, duration, cost, prodCountry, genres, overview }) => {
  return (
    <div className='data-info'>
      <div className="list-data">
        <div className="question-list">
          <p>Дата выхода</p>
          <p>Длительность</p>
          <p>Бюджет</p>
          <p>Страна</p>
          <p>Жанр</p>
        </div>
        <div className="answer-list">
          <p><Moment format='DD MMM YYYY'>{year}</Moment></p>
          <p>{numeral(duration).format('00:00:00')}</p>
          <p><span>$</span> {numeral(cost).format('0,0.00')}</p>
          <p>{prodCountry}</p>
          <p>{genres}</p>
        </div>
      </div>
      <div className='overview'>
        <p>{overview}</p>
      </div>
    </div>
  )

};

export default DataInfo;
