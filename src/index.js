import React    from 'react';
import ReactDOM from 'react-dom';
//App Component
import App      from './App';
//react router
import { BrowserRouter as Router }   from 'react-router-dom';
//redux
import { Provider } from 'react-redux';
import thunk        from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
//reducer
import reducer from './store/reducers/auth.js'
// styles & CSS 
import './index.css';


const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)
))

const app = (
  <Provider store={store}>
    <Router>
      <App/>
    </Router>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
