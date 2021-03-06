import thunk from 'redux-thunk'
import appReducer from '../reducers/index'
import { createStore, applyMiddleware, compose } from 'redux'

// const composeEnhancers = compose
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function configureStore() {
  const middleware = [
    thunk
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
