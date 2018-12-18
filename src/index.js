import React    from 'react';
import ReactDOM from 'react-dom';
// App Component
import App      from './App';
// React router
import { BrowserRouter as Router }   from 'react-router-dom';
// Redux
import { Provider } from 'react-redux';
import thunk        from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
// Reducer
import authReducer from './store/reducers/auth';
import movReducer  from './store/reducers/moviesDown';
// styles & CSS
import './index.css';
// Combine different reducers
const rootReducer = combineReducers({
  auth  : authReducer,
  movie : movReducer
})
// Devtools Redux Extension for Development Settings
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
// Create Store
const store = createStore(rootReducer, composeEnhancers(
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
