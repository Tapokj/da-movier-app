import React from 'react';

import './Backdrop.sass';

const Backdrop = ({ clicked, show }) => (
  show ? <div onClick={clicked} className='backdrop'></div> : null
);

export default Backdrop;
