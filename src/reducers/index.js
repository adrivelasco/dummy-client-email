import { combineReducers } from 'redux';

import siteReducer from './site';
import usersReducer from './users';
import emailsReducer from './emails';
import userReducer from './user';

/** * Combine all reducers and export the combined reducers */
export default combineReducers({
  site: siteReducer,
  emails: emailsReducer,
  users: usersReducer,
  user: userReducer
});
