import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
  success    : null,
  mobileMenu : false,
  user  : {},
  userInfo : {},
  error : null,
  modal : false,
  loading: true
}

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {

    case actionsTypes.CHANGE_USER_PHOTO_START:
      return {
        ...state,
        loading: false
      }

    case actionsTypes.CHANGE_USER_PHOTO_SUCCESS:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          url : action.url
        },
        loading: true
      }

    case actionsTypes.CHANGE_USER_PHOTO_ERROR:
      return {
        ...state,
        error : action.error,
        loading: false
      }

    case actionsTypes.FETCH_USER_INFO_SUCCESS:
      return {
        ...state,
        userInfo : action.userInfo,
        loading: true
      }

    case actionsTypes.FETCH_USER_INFO_ERROR:
      return {
        ...state,
        error : action.error
      }

    case actionsTypes.FETCH_USER:
      return {
        ...state,
        user: action.user
      }

    case actionsTypes.UPDATE_MOVIE_LIST:
      return {
        ...state,
        success : true
      }

    case actionsTypes.UPDATE_MOVIE_ERROR:
      return {
        ...state,
        error : action.error
      }

    case actionsTypes.MOBILE_AUTH:
      return {
        ...state,
        mobileMenu : !state.mobileMenu
      }

    case actionsTypes.AUTH_START:
      return {
        ...state,
        error : null
      }

    case actionsTypes.AUTH_SUCCESS:
      return {
        ...state,
        user  : action.user,
        modal : false
      }

    case actionsTypes.AUTH_FAIL:
      return {
        ...state,
        error : action.error.message
      }

    case actionsTypes.MODAL_LOGIN:
      return {
        ...state,
        modal : !state.modal
      }

    case actionsTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user : action.user
      }

   case actionsTypes.EMAIL_VERIFICATION:
    return {
      ...state,
      success: true
    }

    case actionsTypes.LOG_OUT:
      return {
        ...state,
        user: action.user
      }

    default:
      return state;
  }
}

export default reducer;
