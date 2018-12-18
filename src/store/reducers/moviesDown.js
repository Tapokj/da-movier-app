import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
  popMovies  : [],
  error      : false,
  loading    : true,
  characters : [],
  staff      : [],
  video      : [],
  certainMovie : {}
}

const reducer = ( state = initialState, action ) => {
  switch (action.type) {

    case actionsTypes.START_LOADING_MOVIE:
      return {
        ...state,
        error   : false,
        loading : true
      }

    case actionsTypes.SUCCESS_LOADING:

      return {
        ...state,
        popMovies : action.data,
        error     : false,
        loading   : false
      }

    case actionsTypes.ERROR_LOADING:
      return {
        ...state,
        error   : action.error,
        loading : true
      }

    case actionsTypes.SUCCESS_LOADING_CERTAIN:
      return {
        ...state,
        loading : false,
        certainMovie : action.data
      }

   case actionsTypes.SUCCES_LOAD_PERSON:
     return {
       ...state,
       loading    : false,
       characters : action.data
     }

   case actionsTypes.SUCCES_LOAD_PERSON_STAFF:
     return {
      ...state,
      loading : false,
      staff   : action.data
    }

   case actionsTypes.SUCCES_LOAD_VIDEO:
     return {
      ...state,
      loading  : false,
      video    : action.data
    }

    default:
      return state;
  }
}

export default reducer;
