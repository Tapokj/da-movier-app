import React, { Component } from 'react';

import './UserProfileList.sass';
import Spinner from '../../UI/Spinner/Spinner'
import { Link } from 'react-router-dom';
import ListDispaly from '../../PersonalList/ListDisplay/ListDisplay';

class UserProfileList extends Component {

  state = {
    movieList : null,
    active: false
  }

  /* Lists of movies download after it has been loaded. Func for the first output */
  componentDidUpdate(prevProps){
    if ( this.props.lists !== prevProps.lists ){
      this.setState({
        movieList: this.props.lists[0],
        active: true
      })
    }
  }
  /* Lists downloaded only after component was changed to other component.
    When user switchs between components (such as Password Change, Avatar Change)
    and back to Lists - componentDidMount load lists of movies

    Differents between componentDidUpdate is that it (componentDidUpdate) allows download movie
    after first mounting of components, because when page is renders, async request still not returned
    lists, 'cause of it - we can't render movie first time in the componentDidMount
   */
  componentDidMount(){
    if (this.props.lists[0] !== undefined){
      this.setState({
        movieList: this.props.lists[0],
        active: true
      })
    }
  }

  viewListById = (e) => {
    for ( let element in this.props.lists ){
      if ( this.props.lists[element].id == e.target.id ){
        this.setState({
          movieList : this.props.lists[element],
          active : true
        })
      }
    }
  }

  render() {
    const { movieList } = this.state;

    const listsMovie = movieList ? this.state.movieList.results.map(element => {
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
      <div className='user-profile-list col-md-8'>
        <ul className="list-lists">
          {this.props.lists ? this.props.lists.map(element => {
            return <li onClick={this.viewListById} className={`${this.state.active && element.id === movieList.id ? 'active' : null}`} id={element.id} key={element.id}>{element.name}</li>
          }) : null}
          <li  onClick={this.props.clicked} style={{'display' : 'inline-block'}}><i className='fas fa-plus add-new-list'></i></li>
          <div onClick={(listId) => this.props.clickedDelete(this.state.movieList.id) } style={{'display' : this.state.movieList ? 'inline-block' : 'none'}} className='trash'><i className="fas fa-trash"></i></div>
        </ul>
        <div className="personal-list-container">
          {listsMovie}
        </div>
      </div>
    );
  }
}

export default UserProfileList;
