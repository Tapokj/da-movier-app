import React, { Component } from 'react';

// import { Link } from 'react-router-dom';
//styles
import './Header.sass';

class Header extends Component {

  render() {
    return (
      <header className='header'>
        <div className="text-header">
          <h2>Da'Movier</h2>
        </div>
        <div className='header-actions'>
          <ul className='list-header'>
            <li><p>Фильмы</p></li>
            <li><p>Сериалы</p></li>
          </ul>
        <div className="right-panel">
          <div className='search'>
           <i className="fas fa-search"></i>
          </div>
          <div className="login-header">
            <p>Вход</p>
            <p onClick={this.props.clicked} className='registration-button'>Регистрация</p>
          </div>
        </div>
        </div>
      </header>
    );
  }

}

export default Header;
