import Login from './Login';
import Inbox from './Inbox';
import Email from './Email';
import Compose from './Compose';
import Drafts from './Drafts';
import NotFound from './NotFound';
import Sent from './Sent';

const views = [

  {
    requireAuthentication: true,
    component: Inbox,
    path: '/',
    exact: true
  },

  {
    requireAuthentication: true,
    component: Inbox,
    path: '/inbox',
    exact: true
  },

  {
    requireAuthentication: true,
    component: Compose,
    path: '/compose/:email',
    exact: true
  },

  {
    requireAuthentication: true,
    component: Compose,
    path: '/compose',
    exact: true
  },

  {
    requireAuthentication: true,
    component: Email,
    path: '/:emails/:email',
    exact: true
  },

  {
    requireAuthentication: true,
    component: Drafts,
    path: '/drafts',
    exact: true
  },

  {
    requireAuthentication: true,
    component: Sent,
    path: '/sent',
    exact: true
  },

  {
    component: Login,
    path: '/login',
    exact: true
  },

  {
    requireAuthentication: true,
    component: NotFound,
    path: '*',
    exact: false
  }

];

export default views;
