import * as actionsTypes from './actionsTypes';
import axios from 'axios';

import { storageRef } from '../../components/auth/Firebase/firebase'
import { auth } from '../../components/auth/Firebase';
import { auth as authFunc  } from '../../components/auth/Firebase/firebase.js';


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

export const updateMoviesList = () => {
  return {
    type : actionsTypes.UPDATE_MOVIE_LIST
  }
}

export const errorMovieList = error => {
  return {
    type  : actionsTypes.UPDATE_MOVIE_ERROR,
    error
  }
}

export const fetchUserDispatch = user => {
  return {
    type : actionsTypes.FETCH_USER,
    user : user
  }
}

export const fetchUserIfnoSucc = userInfo => {
  return {
    type     : actionsTypes.FETCH_USER_INFO_SUCCESS,
    userInfo : userInfo
  }
}

export const fetchUserInfoErr = error => {
  return {
    type  : actionsTypes.FETCH_USER_INFO_ERROR,
    error : error
  }
}

export const changeUserPhotoStart = () => {
  return {
    type : actionsTypes.CHANGE_USER_PHOTO_START
  }
}

export const changePhotoProfile = (url) => {
  return {
    type : actionsTypes.CHANGE_USER_PHOTO_SUCCESS,
    url : url
  }
}

export const changeUserProfileError = error => {
  return {
    type : actionsTypes.CHANGE_USER_PHOTO_ERROR,
    error : error
  }
}

// Create List ID in User Profile Info

export const fetchMovieListID = id => dispatch => {
  auth.updateMovieListUser(id)
    .then(()     => dispatch(updateMoviesList()))
    .catch(error => errorMovieList(error.message))
}

export const fetchUser = () => dispatch => {
  authFunc.onAuthStateChanged(user => {
    if ( user ) {
      dispatch(fetchUserDispatch(user))
      axios.get(`https://movie-app-98c6e.firebaseio.com/users/${user.uid}.json`)
        .then(response => {
          dispatch(changeUserPhotoStart())
          storageRef.child(`profile/${response.data.profileImg}`).getDownloadURL().then(url => {
            const obj = {...response.data, url}
            dispatch(fetchUserIfnoSucc(obj))
          })
        })
        .catch(error => dispatch(fetchUserInfoErr(error.message)))
    } else {
      dispatch(fetchUserDispatch(null))
    }
  })
}

export const updatePhotoProfile = (photo) => dispatch => {
  dispatch(changeUserPhotoStart())
  auth.doUpdateProfile(photo)
    .then(() => {
        storageRef.child(`profile/${photo.name}`).getDownloadURL().then(url => {
          dispatch(changePhotoProfile(url))
        })
    })
    .catch(error => dispatch(changeUserProfileError(error.message)))
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

export const authLogout = () => dispatch => {
    auth.doSignOut()
      .then((authUser) => dispatch(logout(authUser)))
}
