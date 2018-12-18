import React, { Component } from 'react';

// Components
import SignUp   from '../auth/SignUp/SignUp';
import SignOut  from '../auth/SignOut/SignOut';
import SignIn   from '../auth/SignIn/SignIn';
import Backdrop from '../UI/Backdrop/Backdrop';
// Redux & actions
import * as actions from '../../store/actions/index'
import { connect }  from 'react-redux';

// styles & CSS
import './MobileMenu.sass';
import { CSSTransition } from 'react-transition-group';

class MobileMenu extends Component {

  state = {
    entrance     : false,
    registration : false
  }

  toggleStateMenu = (e) => {
    let span = e.target.id
    // Extract ID from element and state change depending on id
    this.setState(prevState => ({
      [span] : !prevState[span]
    }))
  }


  render(){
    const { registration, entrance } = this.state;
    const { onToggleMenu, isMenuOpen, error, authUser } = this.props

    return (
      <div>
        <Backdrop clicked={onToggleMenu} show={isMenuOpen}/>
        <div className={`mobile-menu ${this.props.isMenuOpen ? 'open' : null}`}>
          <h2>Da'Movier</h2>
          <ul className='mobile-menu-list'>
            <li><p>Фильмы</p></li>
            <li><p>Сериалы</p></li>
          </ul>
          <div className="action-buttons">
            {/* Don't change any id name. Because toggleStateMenu depends from it  */}
            {/* Change page content depends on authentication condition */}
            {!authUser ? (
              <React.Fragment>
                {error ? <div className="alert alert-danger">{error}</div> : null}
                <span id='entrance' onClick={this.toggleStateMenu}>Войти</span>
                <CSSTransition appear mountOnEnter unmountOnExit in={entrance} timeout={400} classNames='sign-in-mobile-menu'>
                  <div className='sign-in-mobile-menu'>
                      <SignIn/>
                  </div>
                </CSSTransition>

                <span id='registration' onClick={this.toggleStateMenu}>Регистрация</span>
                  <CSSTransition appear mountOnEnter unmountOnExit in={registration} timeout={400} classNames='sign-up-mobile'>
                        <div className='sign-up-mobile'>
                          <SignUp/>
                        </div>
                  </CSSTransition>
              </React.Fragment>

            ) : <SignOut/>}


          </div>
        </div>
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    isMenuOpen : state.auth.mobileMenu,
    authUser   : state.auth.user,
    error      : state.auth.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onToggleMenu: () => dispatch(actions.mobileAuth())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileMenu);
