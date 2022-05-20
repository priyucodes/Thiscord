import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './reducers/authReducer';
import alertReducer from './reducers/alertReducer';
import friendsReducer from './reducers/friendsReducer';
import chatReducer from './reducers/chatReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  friends: friendsReducer,
  chat: chatReducer,
});

const store = createStore(
  rootReducer,
  // Allow Async calls in our redux ACTIONS
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;

/*import { createStore, applyMiddleware } from 'redux';
const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // options like actionSanitizer, stateSanitizer
    }) : compose;
const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
  // other store enhancers if any
);
const store = createStore(reducer, enhancer);
*/
