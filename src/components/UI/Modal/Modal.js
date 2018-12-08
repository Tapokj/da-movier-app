import React from 'react';
//hoc
import Movierapper from '../../../hoc/Movierapper';
//component
import Backdrop    from '../Backdrop/Backdrop';
//styles
import './Modal.css'

const Modal = ({ children, show, modalClose }) => (

  <Movierapper>

    <Backdrop clicked={modalClose} show={show} />

    <div className='modal-window' style={{
       'transform': show ? 'scale(0.8)' : null,
       'opacity'  : show ? '1' : '0'
     }}>
       <div className="content-modal">
         {children}
       </div>
     </div>

  </Movierapper>
);

export default Modal;
