import React, { Fragment } from 'react';

// Components
import Spinner from '../../UI/Spinner/Spinner';

//styles
import './UserProfileInfo.sass';

const UserInfo = ({ url, username, email, clicked, changer }) => {

  const imageUrl = url ? <img src={url} alt="Profile"/> : <Spinner/>

  return (
    <Fragment>
      <div className='col-md-4'>
        <div className='user-info'>
          {imageUrl}
          <h3>{username}</h3>
          <p>{email}</p>
        </div>
        <div className="user-links">
          <ul>
            <li onClick={(e) => clicked(e)} id='list' className={`${changer === 'list' ? 'active ' : null}`}>Мои списки</li>
            <li onClick={(e) => clicked(e)} id='pass-change' className={`${changer === 'pass-change' ? 'active'  : null}`}>Смена пароля</li>
            <li onClick={(e) => clicked(e)} id='avat-change' className={`${changer === 'avat-change' ? 'active ' : null}`}>Изменить аватар</li>
          </ul>
        </div>
      </div>
    </Fragment>
  )
};

export default UserInfo;
