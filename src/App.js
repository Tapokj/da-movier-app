import React, { Component } from 'react';
//react-router
import { Route, Switch, withRouter } from 'react-router-dom';
//components
import Layout     from './components/Layout/Layout';
import List       from './components/List/List';
import FullMovie  from './components/FullMovie/FullMovie';
import MainPage   from './components/MainPage/MainPage';
import DynamicList from './components/DynamicList/DynamicList';
import PersonalList from './components/PersonalList/PersonalList';
import UserProfile  from './components/UserProfile/UserProfile';

import { fetchUser } from './store/actions'
import { connect }   from 'react-redux';

//styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.sass';

class App extends Component {
  // Fetch Users by onAuthStateChanged
  componentWillMount(){
    this.props.fetchUser()
  }

  render() {
    return (
      <Layout>
          <Switch>
            <Route  exact path='/' component={MainPage}/>
            <Route  exact path='/movies/page/:page' component={List} />
            <Route  exact path='/:param/page/:page' component={DynamicList} />
            <Route  exact path='/movie/:id'         component={FullMovie}/>
            <Route  exact path='/personal-list/'    component={PersonalList}/>
            <Route  exact path='/user-profile/'     component={UserProfile}/>
          </Switch>
      </Layout>
    );
  }
}

export default withRouter(connect(null, {fetchUser})(App));
