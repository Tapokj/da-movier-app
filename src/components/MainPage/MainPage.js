import React, { Component } from 'react';

import { API_V3_KEY } from '../../API/API';
import axios from 'axios';
import { Link } from 'react-router-dom';

import MainPageDisplay from './MainPageDisplay/MainPageDisplay';
// styles
import './MainPage.sass';

class MainPage extends Component {

  state = {
    top_rated: [],
    popular : [],
    upcoming: []
  }

  // This function receive 2 params. Firt - params which will'be use as param for loading movie
  // Second - Count for slicing list
  loadResourceMovie = (sortParam, countSlice = 6) => {
    const baseURL = 'https://api.themoviedb.org/3/movie/';

    axios.get(`${baseURL}${sortParam}?api_key=${API_V3_KEY}&language=ru`)
      .then(response => {
        const dataArr = [...response.data.results.slice(0, countSlice)]
        this.setState({ [sortParam] : dataArr })
      })
  }

  componentDidMount(){
    this.loadResourceMovie('top_rated', 12)
    this.loadResourceMovie('popular',   12)
    this.loadResourceMovie('upcoming',   6)
  }

  render() {
    const { top_rated } = this.state;
    return (
      <div className='main-page container'>
        <MainPageDisplay link='upcoming'  data={this.state.upcoming}  nameData='Предстоящие'/>
        <MainPageDisplay link='top_rated' data={this.state.top_rated} nameData='Высокооцененные'/>
        <MainPageDisplay link='popular' data={this.state.popular}   nameData='Популярные'/>
      </div>
    );
  }

}

export default MainPage;
