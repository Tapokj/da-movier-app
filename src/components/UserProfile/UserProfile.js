import React, { Component } from 'react';

//components
import UserProfileInfo from './UserProfileInfo/UserProfileInfo';
import UserProfileList from './UserProfileList/UserProfileList';
import PasswordUpdate  from '../auth/PasswordUpdate/PasswordUpdate';
import CreateList      from '../MoviesList/CreateList/CreateList';
// import Spinner from '../UI/Spinner/Spinner';
import Cookies from 'universal-cookie';

import * as actions from '../../store/actions';
import { connect }  from 'react-redux';

// styles
import './UserProfile.sass';

class UserProfile extends Component {

  reqCook = new Cookies()

  state = {
    userLists: null,
    switcher: 'list'
  }

  switchData = (e) => {
    this.setState({ switcher : e.target.id, listCreate : false })
  }

  afterCreateList = () => {
    this.setState({ switcher: 'list' })
    this.props.onChangeInfoUser(this.props.authUser)
    this.props.onUpdateLists()
  }

  handleNewList = () => {
    this.setState({ userLists : null, switcher: 'create-list' })
  }

  deleteListHandler = list => {
    this.props.onDeleteListInfo(list, this.props.authUser)
    this.props.onDeleteList(list, this.reqCook.get('ac_tok'))
  }

  render() {
    const { userInfo, personalList } = this.props;

    let switcherData

    if (this.state.switcher === 'list') {
      switcherData = <UserProfileList
        changer={this.state.switcher}
        clicked={this.handleNewList}
        clickedDelete={this.deleteListHandler}
        lists={personalList} />
    }

    else if (this.state.switcher === 'create-list') {
      switcherData = (
        <div className='create-user-list-profile'>
          <h2>Создание Персонального Списка</h2>
          <CreateList updated clicked={this.afterCreateList} session={this.reqCook.get('ac_tok')}/>
        </div>
      )
    }

    else if (this.state.switcher === 'pass-change') {
      switcherData = <PasswordUpdate/>
    }

    else if (this.state.switcher === 'avat-change') {
      switcherData = <div>Avat Change</div>
    }

    return (
      <div className='user-profile container'>
        <UserProfileInfo
          changer={this.state.switcher}
          clicked={this.switchData}
          username={userInfo.username}
          email={userInfo.email}
          url={userInfo.url} />
        {switcherData}
      </div>
    );
  }
}

export const mapStateToProps = state => {
  return {
    authUser     : state.auth.user,
    userInfo     : state.auth.userInfo,
    personalList : state.movie.personalList
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    onChangeInfoUser : user => dispatch(actions.updateUserInfo(user)),
    onUpdateLists    : ()   => dispatch(actions.updateList()),
    onDeleteListInfo : (list, user)  => dispatch(actions.deleteUserListProf(list, user)),
    onDeleteList     : (list, token) => dispatch(actions.deleteList(list, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
