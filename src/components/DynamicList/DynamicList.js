import React, { Component } from 'react';

import axios   from 'axios';
import { Link } from 'react-router-dom';

import ReactPaginate  from 'react-paginate';
import ListDisplay    from '../PersonalList/ListDisplay/ListDisplay';

import { API_V3_KEY } from '../../API/API';

import './DynamicList.sass';

class DynamicList extends Component {

  state = {
    data : []
  }

  loadPage = (page) => {
    this.props.history.replace(`/${this.props.match.params.param}/page/${page.selected + 1}`)
    window.scrollTo(0, 0)
  }

  loadResourceOnList = () => {
    const baseURL = 'https://api.themoviedb.org/3/movie/';

    axios.get(`${baseURL}${this.props.match.params.param}?api_key=${API_V3_KEY}&language=ru&page=${this.props.match.params.page}`)
      .then(response => {
        const dataArr = [...response.data.results]
        this.setState({ data : dataArr })
      })
  }

  componentDidMount(){
    this.loadResourceOnList()
  }

  componentDidUpdate(prevProps){
    if (this.props.match.params.param !== prevProps.match.params.param || this.props.match.params.page !== prevProps.match.params.page){
      this.loadResourceOnList()
    }
  }

  render() {
    const { data } = this.state;
    return (
      <div className='dynamic-list col-md-8 container'>
        {data ? data.map(element => (
          <div key={element.id}  className='list-dyn'>
            <Link to={`/movie/${element.id}`}>
              <ListDisplay
                title={element.title}
                image={element.poster_path}
                overview={element.overview}
                release_date={element.release_date}
                vote_average={element.vote_average} />
            </Link>
          </div>
        )) : null}
        <ReactPaginate
          pageCount={10}
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
    );
  }

}

export default DynamicList;
