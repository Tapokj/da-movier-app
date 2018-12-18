import React  from 'react';
// Components
import Header from '../Header/Header';
import Modal  from '../UI/Modal/Modal'
import SignUp from '../auth/SignUp/SignUp';

import ErrorAlert   from '../ErrorAlert/ErrorAlert';
import MobileMenu   from '../MobileMenu/MobileMenu';
// hoc
import Movierapper  from '../../hoc/Movierapper';
// Redux & actions
import { connect }  from 'react-redux';
import * as actions from '../../store/actions'

const Layout = ({ onAuthModal, loginModal, children  }) =>  (
  <Movierapper>
    <Header clicked={onAuthModal}/>
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

const mapStateToProps = state => {
  return {
    loginModal : state.auth.modal,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthModal : () => dispatch(actions.loginModalHandler())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
