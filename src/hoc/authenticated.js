import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions'

export default (ComposedComponent) => {

  class Authentication extends Component {
      
    render (){
      if ( this.props.authenticated ) {
        return <ComposedComponent {...this.props} />
      }
      return null
    }
  }

  const mapStateToProps = state => {
    return {
      authenticated : state.auth.user
    }
  }

  return connect(mapStateToProps)(Authentication)
}
