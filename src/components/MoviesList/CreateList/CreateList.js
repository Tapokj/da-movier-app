import React, { Component } from 'react';

import { connect } from 'react-redux';
import axios from 'axios';
import * as actions from '../../../store/actions'

import './CreateList.sass';

class CreateList extends Component {

  state = {
    name : '',
    description : ''
  }

  changeHandlerList = (e) => {
    e.preventDefault()

    this.setState({
      [e.target.name] : e.target.value
    })
  }

  onSubmitHandler = (e) => {
    e.preventDefault();

    const postList = {
      name : this.state.name,
      description : this.state.description,
      iso_639_1 : 'ru'
    }

    axios({
      url: 'https://api.themoviedb.org/4/list',
      method: 'post',
      headers: {
        'Authorization' : `Bearer ${this.props.session}`,
        'Content-Type'  : `application/json;charset=utf-8`
      },
      data: postList
    })
    .then(response => this.props.onChangeInfo(response.data.id))
    .then(() => this.props.clicked())
  }

  render() {
    return (
        <div className='create-list'>
            <div className="col-md-10 form-control-group">
              <form onSubmit={this.onSubmitHandler}>
                <input
                  value={this.state.name}
                  className='form-control'
                  name='name'
                  onChange={this.changeHandlerList}
                  placeholder='List Name'
                  type="text"/>
                <input
                  value={this.state.description}
                  className='form-control'
                  name='description'
                  onChange={this.changeHandlerList}
                  placeholder='List Description'
                  type="text"/>
                <div>
                  <button className='btn'>Create List</button>
                </div>
              </form>
            </div>
        </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onHandleSubmit: (session, postData) => dispatch(actions.submitListHandler(session, postData)),
    onChangeInfo  : (listID)            => dispatch(actions.fetchMovieListID(listID))
  }
}

export default connect(null, mapDispatchToProps)(CreateList);
