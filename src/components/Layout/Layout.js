import React, { Component } from 'react';
//components
import Header from '../Header/Header';
import Modal  from '../UI/Modal/Modal'
import SignUp from '../auth/SignUp/SignUp';
//hoc
import Movierapper from '../../hoc/Movierapper';
import { Route }   from 'react-router-dom';

class Layout extends Component {

  state = {
    loginModal: false
  }

  loginModalHandler = () => {
    this.setState({loginModal: !this.state.loginModal})
  }

  render() {
    return (
      <Movierapper>
        <Header clicked={this.loginModalHandler}/>
        <div className="content">
          <Modal modalClose={this.loginModalHandler} show={this.state.loginModal}>
            <SignUp/>
          </Modal>
          {this.props.children}
        </div>
      </Movierapper>
    );
  }

}

export default Layout;
