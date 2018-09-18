import Login from './Login';
import Inbox from './Inbox';

const views = [

  {
    component: Inbox,
    path: '/',
    exact: true
  },

  {
    component: Login,
    path: '/login',
    exact: true
  }

];

export default views;
