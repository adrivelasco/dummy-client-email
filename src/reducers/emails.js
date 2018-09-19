import {
  EMAILS_GET_ALL,
  EMAILS_GET_BY_ID,
  DRAFTS_SAVE
} from '../client/constants';

const initialState = {
  isFetching: false,
  success: false,
  rejected: false,
  data: null
};

function getDraftEmails(state = initialState, action) {
  switch (action.type) {
    case `${DRAFTS_SAVE}_SUCCESS`:
      return {
        ...state,
        data: action.results,
        isFetching: false,
        success: true
      };
    case `${DRAFTS_SAVE}_RESET`:
      return initialState;
    default: {
      return state;
    }
  }
}

function getAllEmails(state = initialState, action) {
  switch (action.type) {
    case `${EMAILS_GET_ALL}_REQUEST`:
      return {
        ...state,
        isFetching: true
      };
    case `${EMAILS_GET_ALL}_REJECTED`:
      return {
        ...state,
        isFetching: false,
        rejected: true
      };
    case `${EMAILS_GET_ALL}_SUCCESS`:
      return {
        ...state,
        data: action.results,
        isFetching: false,
        success: true
      };
    case `${EMAILS_GET_ALL}_RESET`:
      return initialState;
    default: {
      return state;
    }
  }
}

function getEmailById(state = initialState, action) {
  switch (action.type) {
    case `${EMAILS_GET_BY_ID}_REQUEST`:
      return {
        ...state,
        isFetching: true
      };
    case `${EMAILS_GET_BY_ID}_SUCCESS`:
      return {
        ...state,
        data: action.results,
        isFetching: false,
        success: true
      };
    case `${EMAILS_GET_BY_ID}_REJECTED`:
      return {
        ...state,
        isFetching: false,
        rejected: true
      };
    case `${EMAILS_GET_BY_ID}_RESET`:
      return initialState;
    default: {
      return state;
    }
  }
}

export default function emailsReducer(state = {}, action) {
  return {
    all: getAllEmails(state.all, action),
    single: getEmailById(state.single, action),
    drafts: getDraftEmails(state.drafts, action)
  };
}
