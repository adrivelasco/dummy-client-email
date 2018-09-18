import { EMAILS_GET_ALL, EMAILS_GET_BY_ID } from '../client/contants';
import { getAllEmails, getEmailById } from '../client/services/emails';

export const actionGetAllEmails = {
  /**
   * Dispatch an action to get all emails data
   */
  fetch: () => async dispatch => {
    dispatch({
      type: `${EMAILS_GET_ALL}_REQUEST`,
      status: 'start'
    });
    try {
      const res = await getAllEmails();
      return dispatch({
        type: `${EMAILS_GET_ALL}_SUCCESS`,
        results: res.body,
        status: 'success'
      });
    } catch (error) {
      return dispatch({
        error,
        type: `${EMAILS_GET_ALL}_REJECTED`,
        status: 'error'
      });
    }
  },
  /**
   * Dispatch an action to reset all emails data
   */
  reset: () => dispatch =>
    dispatch({
      type: `${EMAILS_GET_ALL}_RESET`,
      status: 'reset'
    })
};

export const actionGetEmailById = {
  /**
   * Dispatch an action to get all emails data
   * @param {String|Number} id - Email ID
   */
  fetch: (id) => async dispatch => {
    dispatch({
      type: `${EMAILS_GET_BY_ID}_REQUEST`,
      status: 'start'
    });
    try {
      const res = await getEmailById(id);
      return dispatch({
        type: `${EMAILS_GET_BY_ID}_SUCCESS`,
        results: res.data,
        status: 'success'
      });
    } catch (error) {
      return dispatch({
        error,
        type: `${EMAILS_GET_BY_ID}_REJECTED`,
        status: 'error'
      });
    }
  },
  /**
   * Dispatch an action to reset email by id
   */
  reset: () => dispatch => {
    dispatch({
      type: `${EMAILS_GET_BY_ID}_RESET`,
      status: 'reset'
    });
  }
};
