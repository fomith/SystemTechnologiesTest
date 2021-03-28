import { createStore, combineReducers, applyMiddleware } from 'redux'
import { rootReducer } from './root-reducer'
import thunk from 'redux-thunk'

const reducers = combineReducers({
  root: rootReducer
})

export const store = createStore(reducers, applyMiddleware(thunk))
