import React, { Component } from 'react';

// Components
import Spinner from './../UI/Spinner/Spinner';
import SideProfileMovie from './SideProfileMovie/SideProfileMovie'
import { connect } from 'react-redux';
import Cookies     from 'universal-cookie';
import * as actions from '../../store/actions';
import { Link } from 'react-router-dom';

import { withRouter } from 'react-router-dom';

import './SideProfile.sass';

class SideProfile extends Component {

  reqCook = new Cookies()

  state = {
    movieList : null
  }

  componentDidUpdate(prevProps){
    /* This code block implement async functions calls in redux actions
      If prev userIfno not equal prev user info. React get currently list from
      profile user and go through each list. Unique ID store as value. That's why
      I use Object.values in this code
    */
    if ( !this.props.updateList && this.props.userInfo !== prevProps.userInfo && this.props.userInfo !== null ) {
      // Code download user info to sidebar if component was updated
      if ( this.props.userInfo.lists ) {
        // eslint-disable-next-line
        Object.values(this.props.userInfo.lists).map(element => {
          this.props.onLoadingLists(element, this.reqCook.get('ac_tok'))
        })
      }
    }

    else if (this.props.updateList === true && this.props.userInfo !== prevProps.userInfo) {
      if ( this.props.userInfo.lists ) {
        // eslint-disable-next-line
        Object.values(this.props.userInfo.lists).map(element => {
          this.props.onLoadingLists(element, this.reqCook.get('ac_tok'), true)
        })
      }
    }
    /* This code block implement updating SideProfile Component after adding new item to list without updating page and
      closing this component. Condition of updating is state which should equals true (should have data)
      and changing prev props depending on updating redux store. If data not equals each other - React
      starting for loop which compare prev name of list in state with new list, then setState is called
      with new data.
    */
    if (this.state.movieList && this.props.personalList !== prevProps.personalList){
      for (let element in this.props.personalList){
        // Compare name of list in state with new list. It looks for matches and puth in the state
        // eslint-disable-next-line
        if (this.props.personalList[element].name == this.state.movieList.name){
          this.setState({ movieList : this.props.personalList[element] })
        }
      }
    }
  }

  /* This function change image of user profile. It get file and when it not equals null
    push it to redux store as arg. Function in redux store change image and return new file
  */
  handleChangeFile = (e) => {
    if ( e.target.files[0] !== null ) {
      this.props.onChangePhoto(e.target.files[0])
    }
  }
  /* This function allows open list by clicked on name of this list. It's compare each element
    in lists searching id matches. ID gets as e.target.id
  */

  viewListById = (e) => {
    for ( let element in this.props.personalList ){
      // eslint-disable-next-line
      if ( this.props.personalList[element].id == e.target.id && !this.state.sideOpen ){
        this.setState({ movieList : this.props.personalList[element]})
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
              <Link id='link-to-profile' to='/user-profile/'><h4>{userInfo ? userInfo.username : null}</h4></Link>
              <p id='email'>{authUser ? authUser.email : null}</p>
          </div>
          <div className="personal-user-lists">
            <ul className='list-of-lists'>
              {loaderPersList}
            </ul>
          </div>
          <SideProfileMovie clicked={this.clearState} data={this.state.movieList ? this.state.movieList.results : null}/>
          {/* for next update project */}
          {/* <div className="button-add-current-movie">
            <button className='btn-added'>Добавить фильм</button>
          </div> */}
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
    loaderList : state.movie.loaderList,
    updateList : state.movie.updateList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangePhoto : (photo) => dispatch(actions.updatePhotoProfile(photo)),
    onLoadingLists: (lists, token, updated) => dispatch(actions.loadingList(lists, token, updated))
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideProfile));
