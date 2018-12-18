import React, { Component } from 'react';
//react-router
import { Route, Switch, withRouter } from 'react-router-dom';
//components
import Layout    from './components/Layout/Layout';
import List      from './components/List/List';
import FullMovie from './components/FullMovie/FullMovie';
//styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.sass';

class App extends Component {
  render() {
    return (
      <Layout>
          <Switch>
            <Route exact path='/movies/page/:page' component={List} />
            <Route exact path='/movie/:id' component={FullMovie}/>
          </Switch>
      </Layout>
    );
  }
}

export default withRouter(App);
