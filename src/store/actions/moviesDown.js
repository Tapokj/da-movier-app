import * as actionsTypes from './actionsTypes';

import { API_V3_KEY as API_KEY } from '../../API/API';
// async library
import axios from 'axios';


export const sideChange = () => {
  return {
    type : actionsTypes.ON_SIDE_CHANGED
  }
}

// Start Loading Movies Action
export const startLoading   = () => {
  return {
    type: actionsTypes.START_LOADING_MOVIE
  }
};

// Succes Loading Movies Action
export const successLoading = (data) => {
  return {
    type : actionsTypes.SUCCESS_LOADING,
    data : data
  }
};
// Error Loading Movies Action
export const errorLoading  = (error) => {
  return {
    type  : actionsTypes.ERROR_LOADING,
    error : error
  }
};

export const successLoadingOne = (data) => {
  return {
    type : actionsTypes.SUCCESS_LOADING_CERTAIN,
    data : data
  }
}

export const succesLoadListID = id => {
  return {
    type: actionsTypes.SUCCESS_LOAD_ID,
    id  : id
  }
}

export const succesLoadPerson = (data) => {
  return {
    type : actionsTypes.SUCCES_LOAD_PERSON,
    data : data
  }
}

export const succesLoadPersonStaff = (data) => {
  return {
    type : actionsTypes.SUCCES_LOAD_PERSON_STAFF,
    data : data
  }
}

export const succesLoadVideo = data => {
  return {
    type : actionsTypes.SUCCES_LOAD_VIDEO,
    data : data
  }
}

export const successLoadSocial = data => {
  return {
    type : actionsTypes.SUCCESS_LOAD_SOCIAL,
    data : data
  }
}

export const sessionHandler = (session) => {
  return {
    type    : actionsTypes.SESSION_ID_HANDLER,
    session : session
  }
}

export const startAddItem = () => {
  return {
    type : actionsTypes.START_ADD_ITEM
  }
}

export const successAddedItem = () => {
  return {
    type: actionsTypes.SUCCESS_ITEM_ADDED
  }
}

export const errorOnItemAdded = (error) => {
  return {
    type : actionsTypes.ERROR_ITEM_ADDED,
    error: error
  }
}

export const loadPersonalListStart = () => {
  return {
    type : actionsTypes.LOADING_PERSONAL_LIST_START
  }
}


export const loadPersonalListSucc = (data) => {
  return {
    type : actionsTypes.LOADING_PERSONAL_LIST_SUCC,
    data : data
  }
}

export const loadPersonalListError = (error) => {
  return {
    type  : actionsTypes.LOADING_PERSONAL_LIST_ERROR,
    error : error
  }
}

export const updateMovieListStart = () => {
  return {
    type : actionsTypes.PERSONAL_LIST_UPDATE_START
  }
}

export const updateMovieListSucc = (updatedData, list) => {
  return {
    type : actionsTypes.PERSONAL_LIST_UPDATE,
    payload : {
      data : updatedData,
      list : list
    }
  }
}

export const updateMovieListEnd = () => {
  return {
    type : actionsTypes.PERSONAL_LIST_UPDATE_END
  }
}

export const updateListMark = () => {
  return {
    type : actionsTypes.UPDATE_LIST_AFTER_ADD_NEW
  }
}

export const loadingUpdateListStart = () => {
  return {
    type : actionsTypes.LOADING_PERSONAL_LIST_UPDATE_START
  }
}

export const loadingUpdateListSucc = (data) => {
  return {
    type : actionsTypes.LOADING_PERSONAL_LIST_UPDATE_SUCC,
    data : data
  }
}

export const loadingUpdateListErr = error => {
  return {
    type  : actionsTypes.LOADING_PERSONAL_LIST_UPDATE_ERROR,
    error : error
  }
}

export const updateList = () => dispatch => {
  dispatch(updateListMark())
}

export const deleteListStart = () => {
  return {
    type : actionsTypes.START_LIST_DELETE
  }
}

export const deleteListSucc = list => {
  return {
    type : actionsTypes.SUCC_LIST_DELETE,
    list : list
  }
}

export const deleteListErr = error => {
  return {
    type  : actionsTypes.ERROR_LIST_DELETE,
    error : error
  }
}

const baseAPI   = `https://api.themoviedb.org/3`;
const baseAPIv4 = 'https://api.themoviedb.org/4';

export const deleteList = (lists, token) => dispatch => {
  dispatch(deleteListStart())

  axios({
    method: 'delete',
    url : `${baseAPIv4}/list/${lists}`,
    headers: {
      'Authorization' : `Bearer ${token}`,
      'Content-Type'  : `application/json;charset=utf-8`
    }
  })
  .then(() => dispatch(deleteListSucc(lists)))
  .catch(error => dispatch(deleteListErr(error.message)))
}

export const loadingList = (lists, token, updated = false) => dispatch => {
  !updated ? dispatch(loadPersonalListStart()) : dispatch(loadingUpdateListStart())
  axios({
    method: 'get',
    url : `${baseAPIv4}/list/${lists}?page=1&language=ru&sort_by=original_order.desc`,
    headers: {
      'Authorization' : `Bearer ${token}`,
      'Content-Type'  : `application/json;charset=utf-8`
    }
  })
  .then(response => !updated ? dispatch(loadPersonalListSucc(response.data)) : dispatch(loadingUpdateListSucc(response.data)))
  .catch(error   => !updated ? dispatch(loadPersonalListError(error.message)): dispatch(loadingUpdateListErr(error.message)))
}

export const doAddItem = (item, list, sessToken) => {
  return dispatch => {
    dispatch(startAddItem())
    axios({
      url: baseAPIv4 + `/list/${list}/items`,
      method : 'post',
      headers: {
        'Authorization' : `Bearer ${sessToken}`,
        'Content-Type'  : `application/json;charset=utf-8`
      },
      data: {
        'items' : [
          {
            'media_type' : 'movie',
            'media_id' : item
          }
        ]
      }
    })
    .then(response => {
      dispatch(updateMovieListStart())
      axios({
        method: 'get',
        url : `${baseAPIv4}/list/${list}?page=1&language=ru&sort_by=original_order.desc`,
        headers: {
          'Authorization' : `Bearer ${sessToken}`,
          'Content-Type'  : `application/json;charset=utf-8`
        }
      })
      .then(response => dispatch(updateMovieListSucc(response.data, list)))
      .then(() => setTimeout(() => dispatch(updateMovieListEnd()), 1000))
    })
    .catch(error => dispatch(errorOnItemAdded(error.message)))
  }
}

export const submitListHandler = (session, postData) => {
  return dispatch => {

     axios.post(`${baseAPI}/list?api_key=${API_KEY}&session_id=${session}`, postData)
      .then(response => {
        console.log(response)
        dispatch(succesLoadListID(response.data.list_id))
      })
  }
}

export const doLoadVideo = movie => {
  return dispatch => {
    dispatch(startLoading())

    axios.get(`${baseAPI}/movie/${movie}/videos?api_key=${API_KEY}&language=en-US`)
      .then(response => {
        const allVideo = []
        for ( let video in response.data.results.slice(0, 2) ) {
          allVideo.push({
            ...response.data.results[video]
          })
        }
        dispatch(succesLoadVideo(allVideo))
      })
      .catch(error => dispatch(errorLoading(error.message)))
  }
}


export const doLoadSocial = id => {
  return dispatch => {
    axios.get(`${baseAPI}/movie/${id}/external_ids?api_key=${API_KEY}`)
      .then(response => {
        dispatch(successLoadSocial(response.data))
      })
     .catch(error => dispatch(errorLoading(error.message)))
  }
}

// Start Loading Movies Functionality
export const doLoadMovie = (page = 1) => {
  return dispatch => {
    dispatch(startLoading())

    const allMovieArr = []
      axios.get(`${baseAPI}/movie/popular?api_key=${API_KEY}&language=ru&page=${page}`)
        .then(response => {
          for ( let element in response.data.results ) {
            allMovieArr.push({
              ...response.data.results[element]
            })
          }
          dispatch(successLoading(allMovieArr.slice(0, 500)))
        })
        .catch(error => dispatch(errorLoading(error.message)))
  }
}

export const doLoadCertainMovie = id => {
  return dispatch => {
    dispatch(startLoading())

    axios.get(`${baseAPI}/movie/${id}?api_key=${API_KEY}&language=ru`)
      .then(response => {
        dispatch(successLoadingOne({ ...response.data }))
      })
     .catch(error   => dispatch(errorLoading(error.message)))
  }
}

export const doCharactersLoad = (id, typePerson) => {
  return dispatch => {
     axios.get(`${baseAPI}/movie/${id}/credits?api_key=${API_KEY}`)
      .then(response => {

        switch (typePerson) {

          case actionsTypes.PERSON_CHARACTERS:
            const newArrPerson = [];

            for (let element in response.data.cast) {
              newArrPerson.push({...response.data.cast[element]})
            }

            return dispatch(succesLoadPerson(newArrPerson))

          case actionsTypes.PERSON_STAFF:
            const newArrStaff = [];

            for (let element in response.data.crew) {
              newArrStaff.push({...response.data.crew[element]})
            }

           return dispatch(succesLoadPersonStaff(newArrStaff))

          default:
            return

        }
      })
     .catch(error => dispatch(errorLoading(error.message)))
  }
};
