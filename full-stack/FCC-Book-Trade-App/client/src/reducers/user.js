const userReducer = (state = {}, action) => {
  switch(action.type) {
    case 'SET_PROFILE':
      return {
        ...state,
        Profile: action.details
      }
    default:
      return state
  }
}

export default userReducer;
