import * as actionsTypes from './actionsTypes';

import { auth } from '../../components/auth/Firebase';


export const mobileAuth = () => {
  return {
    type: actionsTypes.MOBILE_AUTH
  }
}

export const authStart = () => {
  return {
    type : actionsTypes.AUTH_START
  }
}

export const authSuccess = (user) => {
  return {
    type : actionsTypes.AUTH_SUCCESS,
    user : user
  }
}

export const authFail = (error) => {
  return {
    type  : actionsTypes.AUTH_FAIL,
    error : error
  }
}

export const loginModalHandler = () => {
  return {
    type: actionsTypes.MODAL_LOGIN
  }
}

export const loginSuccess = (user) => {
  return {
    type: actionsTypes.LOGIN_SUCCESS,
    user: user
  }
}

export const loginEmailVerification = () => {
  return {
    type: actionsTypes.EMAIL_VERIFICATION
  }
}

export const logout = (user) => {
  return {
    type: actionsTypes.LOG_OUT,
    user: user
  }
}

export const authLogin = ( email, password ) => {
  return dispatch => {
    dispatch(authStart())

    auth.doLogin( email, password )
      .then(authUser => {
        dispatch(loginSuccess(authUser))
      })
      .catch(error => {
        dispatch(authFail(error))
      })
  }
}

export const authRegister = ( email, password, username ) => {
  return dispatch => {
    // firebase function is async func. Tha's why I use this approach here. Just Redux Thunk. No more
    dispatch(authStart())

    auth.doRegistration( email, password )
      .then(authUser => {
        dispatch(authSuccess(authUser))
        return authUser
      })
      .then(authUser => {
        auth.doCreateUser(authUser.user.uid, username, authUser.user.email)
      })
      .then(() => {
        auth.doEmailVerification()
      })
      .then(() => {
        dispatch(loginEmailVerification())
      })
      .catch(error   => {
        dispatch(authFail(error))
      })
  }
}

export const authLogout = () => {
  return dispatch => {
    auth.doSignOut()
      .then((authUser) => dispatch(logout(authUser)))
  }
}
