import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './reducers/authReducer';
import alertReducer from './reducers/alertReducer';
const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
});

const store = createStore(
  rootReducer,
  // Allow Async calls in our redux ACTIONS
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
