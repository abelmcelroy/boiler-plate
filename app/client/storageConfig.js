import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers'
import loggingMiddleware from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import promiseMiddleware from 'redux-promise'; // https://www.npmjs.com/package/redux-promise

const middleWare = [promiseMiddleware, thunkMiddleware, loggingMiddleware]

export const store = createStore(
  rootReducer,
  applyMiddleware(...middleWare),
)
