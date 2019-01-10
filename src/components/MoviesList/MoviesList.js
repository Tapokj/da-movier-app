import React, { Component } from 'react';

import Modal from '../UI/Modal/Modal';
import axios from 'axios';
import CreateList from './CreateList/CreateList';

import Cookies from 'universal-cookie';

import { API_V4_KEY } from '../../API/API.js';

import { withRouter } from 'react-router-dom';
import './MoviesList.sass';

const cookReq = new Cookies()

class MoviesList extends Component {

  state = {
    request_token: null ,
    session_token: null || cookReq.get('ac_tok')
  }

  // Step 1: Create a request token
  submitListHandler = () => {

    axios({
      method: 'post',
      url : `https://api.themoviedb.org/4/auth/request_token`,
      headers: {
        'Authorization' : `Bearer ${API_V4_KEY}`,
        'Content-Type'  : `application/json;charset=utf-8`
      }
    })
    .then((response) => {
      this.setState({
        request_token: response.data.request_token
      });
      return response
    })
    .then(response => window.open(`https://www.themoviedb.org/auth/access?request_token=${this.state.request_token}`, null,))
  };

  // Step 2: Create Acess Token
  submitAccessTok = () => {

    const reqToken = {
      request_token : this.state.request_token
    }

    if ( this.state.request_token ) {
      axios({
        method: 'post',
        url : `https://api.themoviedb.org/4/auth/access_token`,
        data : reqToken,
        headers: {
        'Authorization' : `Bearer ${API_V4_KEY}`,
          'Content-Type'  : `application/json;charset=utf-8`
        }
      })
      .then(response => this.setState({ session_token : response.data.access_token }))
      .then(() => {
        cookReq.set('ac_tok', this.state.session_token, { path: '/' })
      })
    }
  }

  render() {
    return (
      <Modal modalClose={this.props.modalClose} show={this.props.show}>
        {!cookReq.get('ac_tok') ? (
          <div className="container col-md-10 movies-list-modal">
              <h2>Создание списка The Movie DB</h2>
              <p>Наш сайт использует The Movie Database API для работы со списками, поэтому прежде чем приступить к созданию списка стоит пройти авторизацию.</p>
              <p>1. Пройдите регистрацию на The Movie Database API. Если же аккаунт уже существует, просто подтвердите синхронизацию нашего сайта с вашей учетной записью.</p>
              <button onClick={this.submitListHandler} className='btn'>Пройти аутентификацию</button>
              <p>2. После этого вы можете создавать ваш персональный список The Movie Database прямо с нашего сайта.</p>
              <button onClick={this.submitAccessTok} className='btn'>Создать лист</button>
          </div>
        ) : null}

        {this.state.session_token || cookReq.get('ac_tok') ? (
          <CreateList clicked={this.props.modalClose} session={this.state.session_token} />
        ) : null}
     </Modal>

    );
  }
}

export default withRouter(MoviesList);
