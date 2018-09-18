import { USERS_LOGIN, USERS_LOGOUT } from '../client/contants';
import { login, logout } from '../client/services/users';

/**
 * Dispatch an action to login user
 */
export function usersLogin() {
  return async dispatch => {
    dispatch({
      type: `${USERS_LOGIN}_REQUEST`,
      status: 'start'
    });
    try {
      const res = await login();
      return dispatch({
        type: `${USERS_LOGIN}_SUCCESS`,
        results: res.data,
        status: 'success'
      });
    } catch (error) {
      return dispatch({
        error,
        type: `${USERS_LOGIN}_REJECTED`,
        status: 'error'
      });
    }
  };
};

/**
 * Dispatch an action to logout user
 */
export function usersLogout() {
  return async dispatch => {
    dispatch({
      type: `${USERS_LOGOUT}_REQUEST`,
      status: 'start'
    });
    try {
      const res = await logout();
      return dispatch({
        type: `${USERS_LOGOUT}_SUCCESS`,
        results: res.data,
        status: 'success'
      });
    } catch (error) {
      return dispatch({
        error,
        type: `${USERS_LOGOUT}_REJECTED`,
        status: 'error'
      });
    }
  };
};
