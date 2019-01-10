import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import * as actions from '../../../store/actions'

// Styles & CSS
import './Links.sass'

import { connect } from 'react-redux';

class Links extends Component {
  componentDidMount(){
    const params = this.props.match.params.id

    if ( params ) {
      this.props.onLoadSocial(params)
    }
  }

  render(){
    const { socialLink } = this.props;

    return (
      <div className='social'>
        <a rel="noopener noreferrer" target='_blank' href={`https://www.instagram.com/${socialLink.instagram_id}/`}><i className="fab fa-instagram"></i></a>
        <a rel="noopener noreferrer" target='_blank' href={`https://twitter.com/${socialLink.twiiter_id}/`}><i className="fab fa-twitter"></i></a>
        <a rel="noopener noreferrer" target='_blank' href={`https://www.facebook.com/${socialLink.facebook_id}/`}><i className="fab fa-facebook"></i></a>
      </div>
    )
  }
}

const mapStateToProps    = state => {
  return {
    socialLink : state.movie.socialLinks
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadSocial : (id) => dispatch(actions.doLoadSocial(id))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Links));
