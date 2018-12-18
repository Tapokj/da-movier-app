import React, { Component } from 'react';

// Components
import Character from './Characters/Characters';
import DataInfo  from './DataInfo/DataInfo';
import Slider    from 'react-slick';
import Spinner   from '../../components/UI/Spinner/Spinner'
import Videos    from './Videos/Videos';
// Redux & actions
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import * as actionTypes from '../../store/actions/actionsTypes';

// styles & CSS
import './FullMovie.sass';

class FullMovie extends Component {

  componentDidMount () {
    const params = this.props.match.params.id

    if ( params ) {
      this.props.onLoadCertainMovie(params)
      // Load slider of person
      this.props.onLoadPerson(params, actionTypes.PERSON_CHARACTERS)
      this.props.onLoadPerson(params, actionTypes.PERSON_STAFF)
    }
  }

  transformArr = (propArrProp) => {

    const newArr = [];

    propArrProp.map(element => {
      return newArr.push(element.name)
    })
    return newArr.join(', ');
  }


  render() {
    const { moviePost, characters, staff, loading } = this.props;

    const classNames = () => {
      const vote = moviePost.vote_average

      if (vote ? vote.toFixed(1) <= 5 : null ) {
        return 'red_vote'
      }

      else if (vote ? vote.toFixed(1) > 5 && vote.toFixed(1) <= 6.9 : null ) {
        return 'yellow_vote'
      }

      else if (vote ? vote.toFixed(1) >= 7 && vote.toFixed(1) <= 10 : null) {
        return 'green_vote'
      }
    }

    const settingsSlider = {
      dots: true,
      infinite: true,
      speed: 600,
      slidesToShow: 5,
      slidesToScroll: 5
    };

    let dataInfo   = <Spinner/>
    let charSlider = <Spinner/>

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
          <div className="characters-slider">
            <p>В главных ролях</p>
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
            <div className={`wrapper-image ${classNames()}`}>
              {!loading ? <img className='poster-movie' src={`https://image.tmdb.org/t/p/w400${moviePost.poster_path}`} alt="Poster"/> : <Spinner/>}
            </div>
            <div className="vote-and-add-movie">
              <div>
                <p className={`vote ${classNames()}`}>{moviePost.vote_average ?  moviePost.vote_average.toFixed(1) : null}</p>
                <p>Средняя оценка</p>
              </div>
              <div>
                <i className="fas fa-plus add-movie"></i>
                <p>Добавить фильм</p>
              </div>

            </div>
          </div>
          <div className="block-data col-md-7" >
            <h4>{moviePost.title}</h4>
            <span className='origin-name'>{moviePost.original_title}</span>
            <p className='tagline'>{moviePost.tagline}</p>
            {/*  Display basic information about movie */}
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
    loading    : state.movie.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadCertainMovie: (id) => dispatch(actions.doLoadCertainMovie(id)),
    onLoadPerson : (id, typePerson) => dispatch(actions.doCharactersLoad(id, typePerson))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(FullMovie);
