import React, { Component } from 'react';

// Components
import Character from './Characters/Characters';
import DataInfo  from './DataInfo/DataInfo';
import Slider    from 'react-slick';
import Spinner   from '../../components/UI/Spinner/Spinner'
import Videos    from './Videos/Videos';
import Links     from './Links/Links';
import AddToList from './AddToList/AddToList';

import ChooseList from './ChooseList/ChooseList';
import MoviesList from '../MoviesList/MoviesList';

import Cookies    from 'universal-cookie';
// Redux & actions
import { connect }  from 'react-redux';
import * as actions from '../../store/actions';
import * as actionTypes from '../../store/actions/actionsTypes';




import { classNames } from '../../Utillity/Utillity';

// styles & CSS
import './FullMovie.sass';


class FullMovie extends Component {
  // We store session in cookie. It's important for gets value of session!
  reqCook = new Cookies()

  state = {
    openModalAuthMovie : false,
    modalWithList : false
  }

  changeModalHandler = () => {
    this.setState(prevState => ({
      openModalAuthMovie : !prevState.openModalAuthMovie
    }))
  }

  /* Function from redux actions which update our data in store, and download new data depend on new
  value of params
  */
  loadAllInfoOfMovie = (params = this.props.match.params.id) => {
    this.props.onLoadCertainMovie(params)
    // Load slider of person
    this.props.onLoadPerson(params, actionTypes.PERSON_CHARACTERS)
    this.props.onLoadPerson(params, actionTypes.PERSON_STAFF)
  }

  /* When User Switch Movies in SideProfile, DidMount Not called. That's why we compare
  params. And if params was changed, React Update Component with new data
  */
  componentDidUpdate (prevProps) {
    if ( this.props.match.params.id !== prevProps.match.params.id ) {
      this.loadAllInfoOfMovie()
    }
  }

  // Load Movie Data After Mounting
  componentDidMount(){
    const params = this.props.match.params.id
    if ( params ) {
      this.loadAllInfoOfMovie()
    }
  }
  // Actions Funciton for added new item to list. Receives 3 args - (Movie ID, List ID, session token)
  addItemHandler = () => {
    // this.props.onAddItem(this.props.match.params.id, 99398, this.reqCook.get('ac_tok'))
    this.setState(prevState => {
      return {
        modalWithList : !prevState.modalWithList
      }
    })
  }

  addToList = (id) => {
    this.props.onAddItem(this.props.match.params.id, id, this.reqCook.get('ac_tok'))
  }

  // Get Array as arg and parse across each element in this array. Just Utillify function. No more :)
  transformArr = (propArrProp) => {
    const newArr = [];
    propArrProp.map(element => {
      return newArr.push(element.name)
    })
    return newArr.join(', ');
  }


  render() {
    const { moviePost, characters, staff, loading, error } = this.props;
    const { vote_average } = this.props.moviePost;

    const settingsSlider = {
      dots: true,
      infinite: true,
      speed: 600,
      slidesToShow: 5,
      slidesToScroll: 5
    };

    let dataInfo   = <Spinner/>
    let charSlider = <Spinner/>
    // DataInfo - is component which display basic information of movie. And Parse some data to readable view
    if ( !loading ) {
      dataInfo =  <DataInfo
                    duration={moviePost.runtime}
                    year={moviePost.release_date}
                    cost={moviePost.budget}
                    overview={moviePost.overview}
                    prodCountry={moviePost.production_countries ? this.transformArr(moviePost.production_countries) : []}
                    genres={moviePost.genres ? this.transformArr(moviePost.genres) : []}
                    imbd={moviePost.imdb_id}
                  />

      charSlider = (
        <div className="block-overview">
          <MoviesList
            modalClose={this.changeModalHandler}
            show={this.state.openModalAuthMovie}/>
          <div className="characters-slider">
            <p>В главных ролях</p>
            {/* Slider Component Which Display Images Of Characters  */}
            <Slider {...settingsSlider}>
              {characters.slice(0, 10).map(character => {
                return (
                  <Character
                    key={character.cast_id}
                    name={character.name}
                    character={character.character}
                    image={character.profile_path} />
                )
              })}
              <div className='link-to-all-char'><p>Все актеры</p></div>
            </Slider>
          </div>
          <div className="staff-slider">
            <p>Команда</p>
            <Slider {...settingsSlider}>
              {staff.slice(0, 10).map(staff => {
                return (
                  <Character
                    key={staff.credit_id}
                    name={staff.name}
                    character={staff.job}
                    image={staff.profile_path} />
                )
              })}
              <div className='link-to-all-char'><p>Вся команда</p></div>
            </Slider>
          </div>
        </div>
      )
    }

    return (
      <div className='movie-post container'>
        <div className="movie-diff">
          <div className='block-poster'>
            <div className={`wrapper-image ${vote_average ? classNames(vote_average) : null}`}>
              {!loading ? <img className='poster-movie' src={`https://image.tmdb.org/t/p/w400${moviePost.poster_path}`} alt="Poster"/> : <Spinner/>}
            </div>
            <div className="vote-and-add-movie">
              <div>
                <p className={`vote ${vote_average ? classNames(vote_average) : null}`}>{vote_average ?  vote_average.toFixed(1) : null}</p>
                <p>Средняя оценка</p>
              </div>
              <div>
                <AddToList
                  clicked={!this.reqCook.get('ac_tok') ? this.changeModalHandler : this.addItemHandler}
                />
              </div>
            </div>
            <Links/>
            {this.state.modalWithList ? <ChooseList clicked={this.addToList} /> : null}
          </div>
          <div className="block-data col-md-7" >
            <h4>{moviePost.title}</h4>
            <span className='origin-name'>{moviePost.original_title}</span>
            <p className='tagline'>{moviePost.tagline}</p>
            {/*  Display basic information about movie */}

            {/* Error? Woops! We need to display it for user! */}
            {error ? <div className="alert alert-danger">{error}</div> : null}
            {dataInfo}
            {charSlider}
            <Videos/>
          </div>
          <div className="info-links">
            <a rel="noopener noreferrer" target='_blank' href={`https://www.imdb.com/title/${moviePost.imdb_id}/`}><i className="fab fa-imdb"></i></a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    moviePost  : state.movie.certainMovie,
    characters : state.movie.characters,
    staff      : state.movie.staff,
    loading    : state.movie.loading,
    error      : state.movie.error,
    socialLink : state.movie.socialLinks
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadCertainMovie: (id) => dispatch(actions.doLoadCertainMovie(id)),
    onLoadPerson : (id, typePerson) => dispatch(actions.doCharactersLoad(id, typePerson)),
    onAddItem    : (item, list, token) => dispatch(actions.doAddItem(item, list, token))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(FullMovie);
