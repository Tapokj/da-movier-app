import * as actionsTypes from './actionsTypes';
// async library
import axios from 'axios';


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
  console.log(data)
  return {
    type : actionsTypes.SUCCES_LOAD_VIDEO,
    data : data
  }
}

const API_KEY = 'aaf0e38409cf127b161088dd27841deb';


export const doLoadVideo = movie => {
  return dispatch => {
    dispatch(startLoading())



    axios.get(`https://api.themoviedb.org/3/movie/${movie}/videos?api_key=${API_KEY}&language=en-US`)
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

// Start Loading Movies Functionality
export const doLoadMovie = (page = 1) => {
  return dispatch => {
    dispatch(startLoading())

    const allMovieArr = []
      axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ru&page=${page}`)
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

    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=ru`)
      .then(response => {
        dispatch(successLoadingOne(response.data))
      })
     .catch(error   => dispatch(errorLoading(error.message)))
  }
}

export const doCharactersLoad = (id, typePerson) => {
  return dispatch => {
     axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`)
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
