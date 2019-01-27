import React, { Component } from 'react';

// Components
import MovieLink     from './MovieLink.js';
import Spinner       from '../UI/Spinner/Spinner';
import ReactPaginate from 'react-paginate';
// React Router
import { Link }  from 'react-router-dom';
// Redux & actions
import * as actions from '../../store/actions'
import { connect }  from 'react-redux';
// styles & CSS
import './List.sass'

class List extends Component {

  componentDidMount(){
    if (this.props.match.params.page) {
      this.props.onLoadingMovie(this.props.match.params.page)
    }
  }

  loadPage = (page) => {
    this.props.onLoadingMovie(page.selected + 1)
    this.props.history.push(this.props.history.replace(`/movies/page/${page.selected + 1}`))
  }

  render() {
    const { loading, moviesPop } = this.props;

    let listMovie = <Spinner/>

    if (!loading) {
      listMovie = moviesPop.map(element => {
        return (
          <Link key={element.id} to={`/movie/${element.id}`}>
            <MovieLink
             image={element.poster_path}
             title={element.title}
             overview={element.overview}
             date={element.release_date}
             vote={element.vote_average}
            />
          </Link>
        )
      })
    }


    return (
      <div>
        <div className="container movie-wrapper">
          <div className="container-movie">
            <div className="movie-list-link">
              {loading ? listMovie : listMovie.slice(0, 10)}
            </div>
            <div className="movie-list-link">
              {loading ? listMovie : listMovie.slice(10)}
            </div>
          </div>
            <ReactPaginate
              pageCount={30}
              previousLabel={'Previous'}
              nextLabel={'Next'}
              nextClassName='next'
              previousClassName='prev'
              previousLinkClassName='prev-link'
              nextLinkClassName='next-link'
              breakLabel={"..."}
              breakClassName={"break-me"}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              containerClassName={"pagination"}
              pageClassName={"pageStyles"}
              pageLinkClassName='page-link-style'
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
              onPageChange={this.loadPage}
            />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    moviesPop : state.movie.popMovies,
    loading   : state.movie.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadingMovie : (page) => dispatch(actions.doLoadMovie(page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
