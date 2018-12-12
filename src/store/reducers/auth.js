import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
  success    : null,
  mobileMenu : false,
  user  : '',
  error : null,
  modal : false
}

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {

    case actionsTypes.MOBILE_AUTH:
      return {
        ...state,
        mobileMenu: !state.mobileMenu
      }

    case actionsTypes.AUTH_START:
      return {
        ...state,
        error: null
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
        error: action.error.message
      }

    case actionsTypes.MODAL_LOGIN:
      return {
        ...state,
        modal: !state.modal
      }

    case actionsTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user
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
