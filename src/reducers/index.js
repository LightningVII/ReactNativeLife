import { combineReducers } from 'redux-immutable'

import app from './app'
import creations from './creation'
import movies from './movie'
import comments from './comment'

const reducers = {
  app,
  creations,
  movies,
  comments
}

export default combineReducers(reducers)
