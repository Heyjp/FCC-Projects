const loginReducer = (state = {
  isLoginSuccess: false,
  isLoginPending: false,
  loginError: null,
  user: false,
  userLibrary: [],
}, action) => {
  switch (action.type) {

    case "ADD_BOOK_TO_LIBRARY":
      return Object.assign({}, state, {
        userLibrary: state.userLibrary.concat(action.book)
      });

    case "SET_LOGIN_PENDING":
      return Object.assign({}, state, {
        isLoginPending: action.isLoginPending
      });

    case "SET_LOGIN_SUCCESS":
      return Object.assign({}, state, {
        isLoginSuccess: action.isLoginSuccess
      });

    case "SET_LOGIN_ERROR":
      return Object.assign({}, state, {
        loginError: action.loginError
      });

    case "SET_USER":
      return Object.assign({}, state, {
        user: action.user
      });
    case "SET_USER_LIBRARY":
      return Object.assign({}, state, {
        userLibrary: action.userLibrary
      });
    case "SET_REQUEST_MODAL":
    return Object.assign({}, state, {
      requestModal: action.requestModal
    });
    default:
      return state;
  }
}

export default loginReducer;
