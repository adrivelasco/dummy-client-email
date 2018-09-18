import { combineReducers } from 'redux';

import usersReducer from './users';
import emailsReducer from './emails';

/** * Combine all reducers and export the combined reducers */
export default combineReducers({
  emails: emailsReducer,
  users: usersReducer
});
