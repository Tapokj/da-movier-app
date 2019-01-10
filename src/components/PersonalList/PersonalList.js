import React, { Component } from 'react';

import axios       from 'axios';
import Cookies     from 'universal-cookie';
import Spinner     from '../UI/Spinner/Spinner';
import ListDispaly from './ListDisplay/ListDisplay';

import { Link }    from 'react-router-dom';

import './PersonalList.sass';

class PersonalList extends Component {
  // Var which store our cookies
  reqCook = new Cookies()

  state = {
    personalList: null,
    personalListInfo: null  
  }

  componentDidMount(){
    // Load Personal Users Lists
    axios({
      method: 'get',
      url : `https://api.themoviedb.org/4/list/${99398}?page=1&language=ru`,
      headers: {
        'Authorization' : `Bearer ${this.reqCook.get('ac_tok')}`,
        'Content-Type'  : `application/json;charset=utf-8`
      }
    })
    .then(response => {
      const persListInfo = []
      persListInfo.push({
        name   : response.data.name,
        desc   : response.data.description,
        rating : response.data.average_rating
      })
      // Make a shallow copy of response and setState it as personalList
      const personListArr = [...response.data.results]
      this.setState({ personalList : personListArr, personalListInfo : persListInfo })
    })
    .catch(error => console.log(error))
  }

  render() {
     // Render each props from personalList. If personalList havn't value - display Spinner
     let movie = this.state.personalList ? this.state.personalList.map(element => {
      return (
        <Link key={element.id} to={`/movie/${element.id}`}>
          <ListDispaly
            title={element.title}
            image={element.poster_path}
            overview={element.overview}
            release_date={element.release_date}
            vote_average={element.vote_average}
          />
        </Link>
      )
    }) : <Spinner/>

    return (
      <div className='personal-list container'>
        <h1>Персональный лист</h1>
        {movie}
      </div>
    );
  }

}

export default PersonalList;
