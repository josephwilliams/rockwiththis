import thunk from 'redux-thunk'
import appReducer from '../reducers/index'
import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'

import { SET_SONG_PROGRESS } from '../actions'

// const composeEnhancers = compose
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// redux-logger
let reduxLogger
if (process.env.NODE_ENV === 'development') {
  reduxLogger = createLogger({
    // prevent logging of SET_SONG_PROGRESS action
    predicate: (getState, action) => !action.type.includes(SET_SONG_PROGRESS),
  })
}

export default function configureStore() {
  const middleware = [
    thunk,
    reduxLogger
  ].filter(Boolean)
  const store = createStore(
    appReducer,
    composeEnhancers(
      applyMiddleware(...middleware)
    )
  )
  store.subscribe(() => {
    // Will be called everytime the state updates
  })
  return store
}
