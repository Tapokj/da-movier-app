import React from 'react';

//styles
import './ChooseList.sass';
//redux connect
import { connect } from 'react-redux';

const ChooseList = ({ lists, clicked, successAdd }) => {

  const displayList = lists ? lists.map(element => (
      <li onClick={(id) => clicked(element.id)} id={element.id} key={element.id}>{element.name}</li>
  )) : null
  return (
    !successAdd ? <div className='choose-list'><ul>{displayList}</ul></div> : <div className='alert alert-success'><p>Успешно добавлено!</p></div>
  )
};

const mapStateToProps = state => {
  return {
    lists : state.movie.personalList,
    successAdd : state.movie.successAdd
  }
}

export default connect(mapStateToProps)(ChooseList);
