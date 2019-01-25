import React from 'react';

// Component
import Backdrop          from '../Backdrop/Backdrop';
import { CSSTransition } from 'react-transition-group';
// hoc
import Movierapper from '../../../hoc/Movierapper';
// styles & CSS
import './Modal.sass'

const Modal = ({ children, show, modalClose }) => (

  <Movierapper>
    <Backdrop clicked={modalClose} show={show} />
      <CSSTransition mountOnEnter unmountOnExit classNames='modal' timeout={300} in={show} >
        <div className='modal-window'>
           <div className="content-modal">
             {children}
           </div>
         </div>
     </CSSTransition>
  </Movierapper>
);

export default Modal;
