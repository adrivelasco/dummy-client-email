import {
  EMAILS_GET_ALL,
  EMAILS_GET_BY_ID,
  DRAFTS_SAVE,
  SENT_EMAIL
} from '../client/constants';
import { getAllEmails, getEmailById } from '../client/services/emails';

/**
 * Save sent email on local memory
 * @param {Object} email - Data of email
 */
export function actionSentEmail(email) {
  return (dispatch, getState) => {
    let sentEmails = getState().emails.sent.data;

    if (!sentEmails) {
      sentEmails = [email];
    } else {
      sentEmails.push(email);
      sentEmails.sort((a, b) => (b.id - a.id));
    }

    dispatch({
      type: `${SENT_EMAIL}_SUCCESS`,
      results: sentEmails,
      status: 'start'
    });
  };
}

/**
 * Remove draft from local memory
 * @param {Object} draft - Data of email
 */
export function actionRemoveDraft(draft) {
  return (dispatch, getState) => {
    let drafts = getState().emails.drafts.data;

    if (drafts && drafts.length > 0) {
      drafts = drafts.filter(d => d.id != draft.id);
    }

    return dispatch({
      type: `${DRAFTS_SAVE}_SUCCESS`,
      results: drafts,
      status: 'start'
    });
  };
}

/**
 * Save draft on local memory
 * @param {Object} draft - Data of email
 */
export function actionSaveDraft(draft) {
  return (dispatch, getState) => {
    let drafts = getState().emails.drafts.data;

    if (drafts && drafts.length > 0) {
      drafts = drafts.filter(d => d.id != draft.id);
      drafts.push(draft);
      drafts.sort((a, b) => (b.id - a.id));
    } else {
      drafts = [draft];
    }

    return dispatch({
      type: `${DRAFTS_SAVE}_SUCCESS`,
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
  fetch: (id, listEmails) => async (dispatch, getState) => {
    dispatch({
      type: `${EMAILS_GET_BY_ID}_REQUEST`,
      status: 'start'
    });
    try {
      const emails = listEmails || getState().emails.all.data;
      let email;
      if (emails != null && emails.length > 0) {
        email = emails.find(email => Number(email.id) === Number(id));
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
