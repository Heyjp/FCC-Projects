const bookApp = (state = {
  books: [],
  requests: {inc: [], out: []}
}, action) => {
  switch (action.type) {
    case "SET_LIBRARY":
      return {
        ...state,
        books: action.collection
      };
    case "SET_MODAL":
      return {
        ...state,
        modal: action.modal
      }
    case "SET_REQUESTS":
      return {
        ...state,
        requests: action.requests
    }
    case "CANCEL_REQUEST":
      let requests = state.requests.out.filter(function (e) {
          return e._id !== action.book._id
        })
      return {
        ...state,
        requests: {
          inc: state.requests.inc,
          out: requests
        }
      }
    case "ACCEPT_REQUEST":
      let incRequests = state.requests.inc.filter(function (e) {
          return e._id !== action.book._id
        })
      return {
        ...state,
        requests: {
          inc: incRequests,
          out: state.requests.out
        }
      }
    default:
      return state
  }
}

export default bookApp
