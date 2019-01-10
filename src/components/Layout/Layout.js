import React  from 'react';
// Components
import Header from '../Header/Header';
import Modal  from '../UI/Modal/Modal'
import SignUp from '../auth/SignUp/SignUp';

import ErrorAlert   from '../ErrorAlert/ErrorAlert';
import MobileMenu   from '../MobileMenu/MobileMenu';
import SideProfile  from '../SideProfile/SideProfile';
// hoc
import Movierapper  from '../../hoc/Movierapper';
// Redux & actions
import { connect }  from 'react-redux';
import * as actions from '../../store/actions';

import { withRouter } from 'react-router-dom';

  const Layout = ({ onAuthModal, loginModal, children, onSideChange, opened, history  }) =>  {
  return (
    <Movierapper>
      <SideProfile opened={opened} sideProfileClicked={onSideChange}/>
      <Header sideProfileClicked={onSideChange} clicked={onAuthModal}/>
      <MobileMenu/>
      <div className="content">
        {/* Authentication Modal */}
        <Modal modalClose={onAuthModal} show={loginModal}>
          <SignUp/>
        </Modal>
        <ErrorAlert/>
        {children}
      </div>
    </Movierapper>
  )
}

const mapStateToProps = state => {
  return {
    loginModal : state.auth.modal,
    opened : state.movie.openedSideProfile
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthModal : () => dispatch(actions.loginModalHandler()),
    onSideChange: () => dispatch(actions.sideChange())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
