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
import Backdrop     from '../UI/Backdrop/Backdrop';

import { withRouter } from 'react-router-dom';

  const Layout = ({ onAuthModal, loginModal, children, onSideChange, opened, history, backdrop, onChangeBack  }) =>  {
  return (
    <Movierapper>
      <SideProfile opened={opened} sideProfileClicked={onSideChange}/>
      <Header sideProfileClicked={onSideChange} clicked={onAuthModal}/>
      <MobileMenu/>
      <div className="content">
        {/* Authentication Modal */}
        <Backdrop clicked={onChangeBack} show={backdrop}/>
        <Modal modalClose={onAuthModal}  show={loginModal}>
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
    opened     : state.movie.openedSideProfile,
    backdrop   : state.movie.backdrop
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthModal : () => dispatch(actions.loginModalHandler()),
    onSideChange: () => dispatch(actions.sideChange()),
    onChangeBack: () => dispatch(actions.changeBackdrop())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
