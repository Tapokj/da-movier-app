import React    from 'react';
import ReactDOM from 'react-dom';
//App Component
import App      from './App';
//basic styles
import './index.css';
//react router
import { BrowserRouter as Router }   from 'react-router-dom';
// authentication context and config
import Firebase, { FirebaseContext } from './components/auth/Firebase';
//redux
import { Provider } from 'react-redux';
import thunk        from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
//reducer
import reducer from './store/reducers/auth.js'


const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)
))

const app = (
  <Provider store={store}>
    <Router>
      <FirebaseContext.Provider value={new Firebase()}>
        <App/>
      </FirebaseContext.Provider>
    </Router>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
