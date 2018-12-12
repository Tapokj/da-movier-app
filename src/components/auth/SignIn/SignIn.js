import React, { Component } from 'react';

// Redux & actions
import { connect }  from 'react-redux';
import * as actions from '../../../store/actions'

// styles & CSS
import { CSSTransition } from 'react-transition-group';
import './SignIn.sass';

class SignIn extends Component {

  state = {
    email    : '',
    password : '',
  }

  changeLoginHandler = e => {
    e.preventDefault()

    this.setState({[e.target.name] : e.target.value})
  }

  loginHandler = e => {
    e.preventDefault()
    this.props.onAuthLogin(this.state.email, this.state.password)
  }

  render() {
    const { email, password } = this.state;

    return (
      <div className="device-toggler">
        <div className="computer-login">
          <CSSTransition appear={true} mountOnEnter unmountOnExit classNames='sign-in' in={this.props.show} timeout={300}>
              <div className='sign'>
              <span onClick={this.props.click} className="exit-line"></span>
                <form onSubmit={this.loginHandler}>
                  <div className='form-control-group row'>
                    <div className="col">
                      <input
                        className='form-control'
                        value={email}
                        onChange={this.changeLoginHandler}
                        name='email'
                        placeholder='Email'
                        type="text"/>
                    </div>
                    <div className="col">
                      <input
                        className='form-control'
                        value={password}
                        onChange={this.changeLoginHandler}
                        name='password'
                        placeholder='Password'
                        type="password"/>
                    </div>
                    {this.props.show ? <button className='btn-login'>Войти</button> : null}
                  </div>
                </form>
              </div>
          </CSSTransition>
        </div>
        <div className="mobile-login">
          <form onSubmit={this.loginHandler}>
            <div className='form-control-group'>
                <input
                  className='form-control'
                  value={email}
                  onChange={this.changeLoginHandler}
                  name='email'
                  placeholder='Email'
                  type="text"/>
                <input
                  className='form-control'
                  value={password}
                  onChange={this.changeLoginHandler}
                  name='password'
                  placeholder='Password'
                  type="password"/>
                <button className='btn-login'>Войти</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthLogin : (email, password) => dispatch(actions.authLogin(email, password))
  }
}

export default connect(null, mapDispatchToProps)(SignIn);
