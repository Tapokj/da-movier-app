import React from 'react';
// Redux
import { connect }       from 'react-redux';
// style & CSS
import { CSSTransition } from 'react-transition-group';
import './ErrorAlert.sass';

const ErrorAlert = ({ errorBoolean, error }) =>  (
  <CSSTransition classNames='alert-err' in={errorBoolean} timeout={7000}>
    <div className="all-err">
      <div>
        <h5>Error</h5>
        <div className='err-text'>
          <i className="fas fa-times"></i>
          <p>{error}</p>
        </div>
      </div>
    </div>
  </CSSTransition>
)

const mapStateToProps = state => {
  return {
    error        : state.error,
    errorBoolean : state.error ? true : false
  }
}

export default connect(mapStateToProps)(ErrorAlert);
