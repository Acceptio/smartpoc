import { SET_ACCOUNTS } from './types'

export default (state = null, action = {}) => {
  switch (action.type) {
    case SET_ACCOUNTS:
      return action.accounts
    default:
      return state
  }
}
