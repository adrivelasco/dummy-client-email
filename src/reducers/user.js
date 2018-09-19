import { USERS_LOGIN, USERS_LOGOUT } from '../client/constants';

const initialState = {
  email: null,
  logged: false,
  token: null
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case `${USERS_LOGIN}_SUCCESS`:
      return {
        ...state,
        email: action.results.email,
        token: action.results.token,
        logged: true
      };
    case `${USERS_LOGOUT}_SUCCESS`:
      return initialState;
    default:
      return state;
  }
}
