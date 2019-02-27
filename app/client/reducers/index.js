import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import localForage from 'localforage'
import basicReducer from './basicReducer'

const rootReducer = combineReducers({ basicReducer })

const persistConfig = {
  key: 'root',
  storage: localForage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default process.env.NODE_ENV === 'development' ? rootReducer : persistedReducer
