import React from 'react';
// Redux & actions
import { connect }  from 'react-redux';
import * as actions from '../../../store/actions';
//styles & CSS
import './SignOut.sass'

const SignOut = ({ onLogout }) => (
    <div className='sign-out'>
      <button onClick={onLogout}>Выход</button>
    </div>
)

const mapStateToProps = state => {
  return {
    authUser : state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout : () => dispatch(actions.authLogout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignOut);
