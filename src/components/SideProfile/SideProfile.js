import React, { Component } from 'react';

// Components
import Spinner from './../UI/Spinner/Spinner';
import SideProfileMovie from './SideProfileMovie/SideProfileMovie'
import { connect } from 'react-redux';
import Cookies     from 'universal-cookie';
import * as actions from '../../store/actions';

import { withRouter } from 'react-router-dom';

import './SideProfile.sass';

class SideProfile extends Component {

  reqCook = new Cookies()

  state = {
    movieList : null
  }

  componentDidUpdate(prevProps){
    if ( this.props.userInfo !== prevProps.userInfo ) {
      // Code download user info to sidebar if component was updated
      if ( this.props.userInfo.lists ) {
        Object.values(this.props.userInfo.lists).map(element => {
          this.props.onLoadingLists(element, this.reqCook.get('ac_tok'))
        })
      }
    }
  }

  handleChangeFile = (e) => {
    if ( e.target.files[0] !== null ) {
      this.props.onChangePhoto(e.target.files[0])
    }
  }

  viewListById = (e) => {
    for ( let element in this.props.personalList ){
      if ( this.props.personalList[element].id == e.target.id && !this.state.sideOpen ){
        this.setState({ movieList : this.props.personalList[element].results })
      }
    }
  }

  clearState = () => {
    this.setState({ movieList : null })
  }


  render() {
    const { opened, sideProfileClicked, authUser, userInfo, loading, personalList, loaderList } = this.props;

    let imgLoading = <img src={userInfo ? userInfo.url === null ? 'https://www.finearttips.com/wp-content/uploads/2010/05/avatar.jpg' : userInfo.url : null} alt="Profile"/>

    if (!loading) imgLoading = <Spinner/>

    let loaderPersList = personalList ? personalList.map(element => <li
      key={element.id} id={element.id} onClick={(e) => this.viewListById(e)}>{element.name}</li>) : null

    if (!loaderList) loaderPersList = <Spinner/>

    return (
      <div className={`side-profile ${opened ? 'active' : null}`}>
        <div className="profile">
          <div className="prof-info">
              <i onClick={sideProfileClicked} className="fas fa-times"></i>
              {imgLoading}
              <label style={{ 'opacity' : !loading ? '0' : '1' }} htmlFor="upload-profile"><i className="fas fa-plus plus"></i></label>
              <input onChange={this.handleChangeFile} type="file" id='upload-profile'/>
              <h4>{userInfo ? userInfo.username : null}</h4>
              <p id='email'>{authUser ? authUser.email : null}</p>
          </div>
          <div className="personal-user-lists">
            <ul className='list-of-lists'>
              {loaderPersList}
            </ul>
          </div>
          <SideProfileMovie clicked={this.clearState} data={this.state.movieList}/>
          <div className="button-add-current-movie">
            <button className='btn-added'>Добавить фильм</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authUser : state.auth.user,
    userInfo : state.auth.userInfo,
    loading  : state.auth.loading,
    personalList : state.movie.personalList,
    loaderList : state.movie.loaderList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangePhoto : (photo) => dispatch(actions.updatePhotoProfile(photo)),
    onLoadingLists: (lists, token) => dispatch(actions.loadingList(lists, token))
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideProfile));
