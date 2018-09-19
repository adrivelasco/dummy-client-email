const drawerWidth = '300px';

export default {
  userinfo: {
    padding: '1rem',
    position: 'relative'
  },

  paper: {
    width: drawerWidth
  },

  frame: {
    marginLeft: 'auto',
    position: 'relative',
    width: `calc(100% - ${drawerWidth})`
  }
};
