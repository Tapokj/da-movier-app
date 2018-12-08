import React, { Component } from 'react';

import { withFirebase }     from '../Firebase';
import { withRouter }       from 'react-router-dom';
import { connect }          from 'react-redux';

import './SignUp.sass';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUp extends Component {

  state = {
    username    : '',
    email       : '',
    passwordOne : '',
    passwordTwo : '',
    error       : null
  }

  changeHandler = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  signUpHandler = e => {
    const { username, email, passwordOne } = this.state;

    e.preventDefault()
    this.props.firebase.doRegistration(email, passwordOne)
      .then(authUser => {
        this.setState({...INITIAL_STATE})
      })
      .catch(error   => this.setState({ error }))

  }


  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || email === '' || username === ''

    return (
        <div className="container col-md-10 signup-container">
            <h3>Регистрация</h3>
            <p>Регистрация аккаунта. Это займет буквально пару минут.</p>
          <form onSubmit={this.signUpHandler}>
            <div className='signup form-control-group'>
              {error ? <div className='alert alert-danger'>{error.message}</div> : null}
              <label htmlFor="username">Имя пользователя: </label>
              <input
                onChange={this.changeHandler}
                value={username}
                type="text"
                id='username'
                name='username'
                className='form-control'/>
              <label htmlFor="email">E-Mail</label>
              <input
                onChange={this.changeHandler}
                value={email}
                type="email"
                id='email'
                name='email'
                className='form-control'/>
              <label htmlFor="passwordOne">Пароль: </label>
              <input
                onChange={this.changeHandler}
                value={passwordOne}
                type="password"
                id='passwordOne'
                name='passwordOne'
                className='form-control'/>
              <label htmlFor="passwordTwo">Повторите пароль: </label>
              <input
                onChange={this.changeHandler}
                value={passwordTwo}
                type="password"
                id='passwordTwo'
                name='passwordTwo'
                className='form-control'/>
            </div>
            <button disabled={isInvalid} className='btn'>Зарегистрироваться</button>
          </form>
        </div>
    );
  }

}

export default withFirebase(withRouter(SignUp));
