import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
  popMovies  : [],
  error      : false,
  loading    : true,
  characters : [],
  staff      : [],
  video      : [],
  certainMovie : {},
  socialLinks : [],
  session : '',
  openedSideProfile : false,
  personalList : [],
  loaderList : true,
  updateList : false,
  successAdd : false,
  backdrop   : false
}



const reducer = ( state = initialState, action ) => {
  switch (action.type) {

    case actionsTypes.LOG_OUT:
      return {
        ...state,
        personalList: []
      }

    case actionsTypes.CHANGE_BACKDROP:
      return {
        ...state,
        backdrop: !state.backdrop
      }

    case actionsTypes.START_LIST_DELETE:
      return {
        ...state
      }

    case actionsTypes.SUCC_LIST_DELETE:
      const newList = []
      for (let element in state.personalList){
        if (state.personalList[element].id !== action.list){
          newList.push(state.personalList[element])
        }
      }
      return {
        ...state,
        personalList : newList
      }

    case actionsTypes.ERROR_LIST_DELETE:
      return {
        ...state,
        error : action.error
      }

    case actionsTypes.LOADING_PERSONAL_LIST_UPDATE_START:
      return {
        ...state,
        loaderList : false
      }

    case actionsTypes.LOADING_PERSONAL_LIST_UPDATE_SUCC:
        const newArr = [action.data];
        for ( let element in state.personalList ) {
          if ( state.personalList[element].id !== action.data.id ){
            newArr.push(state.personalList[element])
          }
        }
        return {
          ...state,
          loaderList : true,
          updateList : false,
          personalList: newArr
        }


    case actionsTypes.UPDATE_LIST_AFTER_ADD_NEW:
      return {
        ...state,
        updateList: true
      }

    case actionsTypes.PERSONAL_LIST_UPDATE_START:
      return {
        ...state,
        loaderList : false
      }

    case actionsTypes.PERSONAL_LIST_UPDATE:
      const updList = [action.payload.data]
      for (let element in state.personalList){
        if (state.personalList[element].id !== action.payload.list){
          updList.push(state.personalList[element])
        }
      }
      return {
        ...state,
        loaderList : true,
        successAdd : true,
        personalList: updList
      }
   case actionsTypes.PERSONAL_LIST_UPDATE_END:
      return {
        ...state,
        successAdd: false
      }

    case actionsTypes.LOADING_PERSONAL_LIST_START:
      return {
        ...state,
        loaderList : false
      }

    case actionsTypes.LOADING_PERSONAL_LIST_SUCC:
      return {
        ...state,
        loaderList : true,
        updateList : false,
        personalList: [
          ...state.personalList,
          action.data
        ]
      }


    case actionsTypes.LOADING_PERSONAL_LIST_ERROR:
      return {
        ...state,
        loaderList : true,
        error : action.error
      }

    case actionsTypes.ON_SIDE_CHANGED:
      return {
        ...state,
        openedSideProfile : !state.openedSideProfile
      }

    case actionsTypes.ERROR_ITEM_ADDED:
      return {
        ...state,
        error : action.error
      }

    case actionsTypes.SUCCESS_ITEM_ADDED:
      return {
        ...state,
        error : false
      }

    case actionsTypes.START_ADD_ITEM:
      return {
        ...state,
        error : false
      }

    case actionsTypes.SUCCESS_LOAD_SOCIAL:
      return {
        ...state,
        error   : false,
        loading : false,
        socialLinks : action.data
      }

    case actionsTypes.START_LOADING_MOVIE:
      return {
        ...state,
        error   : false,
        loading : true,
        certainMovie : {}
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
        certainMovie : action.data,
        loading : false
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

   case actionsTypes.SESSION_ID_HANDLER:
     return {
      ...state,
      session : action.session
    }


    default:
      return state;
  }
}

export default reducer;
