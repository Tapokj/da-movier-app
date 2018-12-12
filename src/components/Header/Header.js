import React, { Component } from 'react';

// import { Link } from 'react-router-dom';

// Components
import SignIn  from '../auth/SignIn/SignIn';
import SignOut from '../auth/SignOut/SignOut';
// Redux & actions
import { connect }  from 'react-redux';
import * as actions from '../../store/actions'

//styles & CSS
import './Header.sass';

class Header extends Component {

  state = {
    show: false,
  }

  clickHandler = () => {
    this.setState(prevState => ({
      show: !prevState.show
    }))
  }

  render() {
    const { mobile, isMenuOpen, authUser, clicked } = this.props;

    return (
      <header className='header'>
        <div className={mobile ? 'open' : null} onClick={isMenuOpen} id="burger-menu">
           <span></span>
           <span></span>
           <span></span>
           <span></span>
      </div>
        <div className="text-header">
          <h2>Da'Movier</h2>
        </div>
        <div className='header-actions'>
          <ul className='list-header'>
            <li><p>Фильмы</p></li>
            <li><p>Сериалы</p></li>
          </ul>
        <div className="right-panel">
          <div className='search'>
          {!this.state.show ? <i className="fas fa-search"></i> : null}
          </div>
          <div className="login-header">
            {!authUser ? (
              <React.Fragment>
                <SignIn click={this.clickHandler} show={this.state.show} />
                 {!this.state.show ? <p onClick={this.clickHandler}>Вход</p> : null}
                <p onClick={clicked} className='registration-button'>Регистрация</p>
              </React.Fragment>
            ) : <SignOut/>}
          </div>
        </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    authUser : state.user,
    mobile   : state.mobileMenu
  }
}

const mapDispatchToProps = dispatch => {
  return {
    isMenuOpen: () => dispatch(actions.mobileAuth())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
