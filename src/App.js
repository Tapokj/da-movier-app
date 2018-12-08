import React, { Component } from 'react';
//react-router
import { Route, Switch } from 'react-router-dom';
//components
import Layout from './components/Layout/Layout';
import List   from './components/List/List';
//styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.sass';

class App extends Component {
  render() {
    return (
      <Layout>
          <Switch>
            <Route exact path='/' component={List} />
          </Switch>
      </Layout>
    );
  }
}

export default App;
