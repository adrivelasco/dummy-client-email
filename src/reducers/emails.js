import { EMAILS_GET_ALL, EMAILS_GET_BY_ID } from '../client/contants';

const initialState = {
  isFetching: false,
  success: false,
  rejected: false,
  results: null,
  page: 0
};

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
    single: getEmailById(state.single, action)
  };
}
