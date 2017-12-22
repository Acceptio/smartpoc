import multiMiddleware from 'redux-multi'
import thunkMiddleware from 'redux-thunk'

import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger as createLoggerMiddleware } from 'redux-logger'
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux'

import reducer from './reducer'

const isDev = process.env.NODE_ENV === 'development'

const configureStore = history => {
  const loggerMiddleware =
    createLoggerMiddleware({
      collapsed: true,
      timestamp: false
    })

  const routerMiddleware =
    createRouterMiddleware(
      history
    )

  const devMiddleware = isDev
    ? [loggerMiddleware]
    : []

  const middlewares = applyMiddleware(
    multiMiddleware,
    thunkMiddleware,
    routerMiddleware,

    ...devMiddleware
  )

  const store = createStore(reducer,
    composeWithDevTools(middlewares)
  )

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      store.replaceReducer(require('./reducer').default)
    })
  }

  return store
}

export { configureStore }
