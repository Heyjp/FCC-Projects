import { combineReducers } from 'redux'

import loginReducer from './login'
import bookApp from './main'
import userReducer from './user'

const appReducer = combineReducers({
  loginReducer,
  bookApp,
  userReducer
})

const rootReducer = (state, action ) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
}

export default rootReducer;
