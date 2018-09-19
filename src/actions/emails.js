import {
  EMAILS_GET_ALL,
  EMAILS_GET_BY_ID,
  DRAFTS_SAVE
} from '../client/constants';
import { getAllEmails, getEmailById } from '../client/services/emails';

export function actionSaveDraft(draft) {
  return (dispatch, getState) => {
    let drafts = getState().emails.drafts.data;
    if (drafts && drafts.length > 0) {
      drafts = drafts.filter(d => d.timestamp !== draft.timestamp);
      drafts.push(draft);
    }
    return dispatch({
      type: `${DRAFTS_SAVE}_SAVE`,
      results: drafts,
      status: 'start'
    });
  };
}

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
  fetch: (id) => async (dispatch, getState) => {
    dispatch({
      type: `${EMAILS_GET_BY_ID}_REQUEST`,
      status: 'start'
    });
    try {
      const emails = getState().emails.all;
      let email;
      if (emails.success && emails.data != null && emails.data.length > 0) {
        email = emails.data.find(email => Number(email.id) === Number(id));
      } else {
        const res = await getEmailById(id);
        email = res.body;
      }
      return dispatch({
        type: `${EMAILS_GET_BY_ID}_SUCCESS`,
        results: email,
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
