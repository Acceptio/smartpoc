import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import accounts from './accounts/reducer'

export default combineReducers({
  accounts, router: routerReducer
})
