import { USERS_LOGIN, USERS_LOGOUT } from '../client/contants';

const initialState = {
  isFetching: false,
  success: false,
  rejected: false,
  data: null,
  page: 0
};

function authenticate(state = initialState, action) {
  switch (action.type) {
    case `${USERS_LOGIN}_REQUEST`:
      return {
        ...state,
        isFetching: true
      };
    case `${USERS_LOGIN}_REJECTED`:
      return {
        ...state,
        isFetching: false,
        rejected: true
      };
    case `${USERS_LOGIN}_SUCCESS`:
      return {
        ...state,
        data: action.results,
        isFetching: false,
        success: true
      };
    case `${USERS_LOGOUT}_RESET`:
      return initialState;
    default: {
      return state;
    }
  }
}

export default function usersReducers(state = {}, action) {
  return {
    auth: authenticate(state.all, action)
  };
}
