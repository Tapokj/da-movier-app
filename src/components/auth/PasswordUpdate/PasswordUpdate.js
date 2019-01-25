import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import './PasswordUpdate.sass';

class PasswordUpdate extends Component {

  state = {
    passwordFirst: '',
    passwordSecond: ''
  }

  updatePasswordHandler = (e) => {
    e.preventDefault();

    this.props.onPasswordChange(this.state.passwordFirst)
  }

  changeHandler = (e) => {
    e.preventDefault();

    this.setState({[e.target.name] : e.target.value})
  }

  render() {
    const { passwordFirst, passwordSecond } = this.state;
    const isInvalid = passwordFirst !== passwordSecond || passwordFirst === '';
    return (
      <div className='password-update'>
       <h2>Изменение Пароля Пользователя</h2>
        <form onSubmit={this.updatePasswordHandler}>
          <div className='signup form-control-group'>
            <label htmlFor="passwordFirst"> Новый Пароль: </label>
            <input
              onChange={this.changeHandler}
              value={passwordFirst}
              type="password"
              id='passwordFirst'
              name='passwordFirst'
              className='form-control'/>
            <label htmlFor="passwordSecond">Повторите пароль: </label>
            <input
              onChange={this.changeHandler}
              value={passwordSecond}
              type="password"
              id='passwordSecond'
              name='passwordSecond'
              className='form-control'/>
          </div>
          <button disabled={isInvalid} className='btn'>Сменить пароль</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPasswordChange : (password) => dispatch(actions.authUpdatePassword(password))
  }
}

export default connect(null, mapDispatchToProps)(PasswordUpdate);
