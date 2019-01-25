import React, { Component } from 'react';

import { CSSTransition } from 'react-transition-group';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Search.sass';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions'

import { API_V3_KEY } from '../../../API/API';

class Search extends Component {

  state = {
    query : '',
    data  : []
  }

  getResults = () => {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_V3_KEY}&query=${this.state.query}&language=ru`)
      .then(response => this.setState({ data: response.data.results }))
  }

  changeSearchHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      if (this.state.query && this.state.query.length > 3){
        if (this.state.query.length % 2 === 0) {
          this.getResults()
        }
      }
      if (this.state.query.length < 3){
        this.setState({data: []})
      }
    })
  }

  deletePanel = () => {
    this.setState({ query: '', data : [] })
    this.props.onChangeStateBackdrop()
  }

  render() {
    return (
      <CSSTransition mountOnEnter unmountOnExit in={this.props.clickedSearch} classNames='search-input' timeout={300}>
        <div className='search-bar'>
          <form>
            <input onClick={this.props.onChangeStateBackdrop} autocomplete='off' name='query' value={this.props.backdrop ? this.state.query : ''} onChange={this.changeSearchHandler} type="text" placeholder='Search'/>
          </form>
          <div onClick={this.deletePanel} className='results-searching'>
            {this.state.data && this.props.backdrop ? this.state.data.slice(0, 4).map(element => {
              return (
                <Link to={`/movie/${element.id}`} key={element.id} className='search-result'>
                  <div className='block-res'>
                    <img src={`https://image.tmdb.org/t/p/w500/${element.poster_path}`} alt="Poster"/>
                    <div>
                      <h5>{element.title.slice(0, 20) + '...'}</h5>
                      <p>{element.release_date}</p>
                    </div>
                  </div>
                </Link>
              )
            }) : null}
          </div>
        </div>
      </CSSTransition>
    );
  }
}

const mapStateToProps = state => {
  return {
    backdrop: state.movie.backdrop
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeStateBackdrop : () => dispatch(actions.changeBackdrop())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
