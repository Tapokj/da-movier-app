import React, { Component } from 'react';

import { NavLink, Link } from 'react-router-dom';

// Components
import SignIn  from '../auth/SignIn/SignIn';
import SignOut from '../auth/SignOut/SignOut';
import Search  from './Search/Search';
// Redux & actions
import { connect }  from 'react-redux';
import * as actions from '../../store/actions'

//styles & CSS
import './Header.sass';

class Header extends Component {

  state = {
    show: false,
    searchBar : false
  }

  clickHandler = () => {
    this.setState(prevState => ({
      show: !prevState.show
    }))
  }

  componentDidUpdate(prevProps){
    if ( this.props.authUser !== prevProps.authUser ) {
      this.setState({
        show : false
      })
    }
  }

  changeSearchDisplay = () => {
    this.setState(prevState => {
      return { searchBar : !prevState.searchBar }
    })
  }

  render() {
    const { mobile, isMenuOpen, authUser, clicked, sideProfileClicked } = this.props;

    return (
      <header className='header'>
        <div className={mobile ? 'open' : null} onClick={isMenuOpen} id="burger-menu">
           <span></span>
           <span></span>
           <span></span>
           <span></span>
       </div>
        <div className="text-header">
          <Link to='/'><h2>Da'Movier</h2></Link>
        </div>
        <div className="search-on-mobile">
          <Search clickedSearch={!this.state.searchBar} />
        </div>
        <div></div>
        <div className='header-actions'>
            <ul className='list-header'>
              <li><NavLink activeStyle={{color: '#51c3a5'}} to='/movies/page/1'>Фильмы</NavLink></li>
              <li><NavLink activeStyle={{color: '#51c3a5'}} to='#'>Сериалы</NavLink></li>
            </ul>
            <div className="right-panel">
              <div className='search'>
                <Search clickedSearch={this.state.searchBar} />
                {!this.state.show ? <i onClick={this.changeSearchDisplay} className="fas fa-search"></i> : null}
              </div>
              <div className="login-header">
                {!authUser ? (
                  <React.Fragment>
                    <SignIn click={this.clickHandler} show={this.state.show} />
                     {!this.state.show ? <p onClick={this.clickHandler}>Вход</p> : null}
                    <p onClick={clicked} className='registration-button'>Регистрация</p>
                  </React.Fragment>
                ) : (
                  <div className="row prof-section">
                    <i onClick={sideProfileClicked} className="fas fa-user profile"></i>
                    <SignOut/>
                  </div>
                )}

              </div>
            </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    authUser : state.auth.user,
    mobile   : state.auth.mobileMenu
  }
}

const mapDispatchToProps = dispatch => {
  return {
    isMenuOpen: () => dispatch(actions.mobileAuth())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
