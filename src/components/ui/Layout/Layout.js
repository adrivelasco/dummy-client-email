import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import { usersLogout } from '../../../actions/users';
import styles from './styles';

class Layout extends Component {
  static propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object,
    history: PropTypes.shape({
      push: PropTypes.func
    }).isRequired
  };

  /**
   * Push history to a link
   * @param {String} uri - New uri to push state
   */
  onItemMenuClick = (uri) => {
    this.props.history.push(uri);
  }

  /**
   * Logout user
   */
  logout() {
    this.props.dispatch(usersLogout());
  }

  render() {
    const { children, classes, user, site } = this.props;
    return (
      <main>
        {user.logged && (
          <Drawer
            anchor="left"
            classes={{ paper: classes.paper }}
            variant="permanent"
          >
            <div className={classes.userinfo}>
              <Avatar
                alt={user.email}
              />
              <Typography variant="title" gutterBottom>
                Hello,
              </Typography>
              <Typography gutterBottom>
                {user.email}
              </Typography>
            </div>
            <Divider />
            <MenuList>
              <MenuItem onClick={() => this.onItemMenuClick('/')}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText inset primary="Inbox" />
              </MenuItem>
              <MenuItem onClick={() => this.onItemMenuClick('/sent')}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText inset primary="Sent" />
              </MenuItem>
              <MenuItem onClick={() => this.onItemMenuClick('/drafts')}>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText inset primary="Drafts" />
              </MenuItem>
            </MenuList>
            <Divider />
            <MenuList>
              <MenuItem onClick={() => this.logout()}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText inset primary="Logout" />
              </MenuItem>
            </MenuList>
          </Drawer>
        )}
        <div className={user.logged ? classes.frame : ''}>
          {user.logged && (
            <AppBar position="static">
              <Toolbar>
                <Typography variant="title" color="inherit">
                  {site.title} | {site.description}
                </Typography>
              </Toolbar>
            </AppBar>
          )}
          <div className={classes.content}>
            {children}
          </div>
        </div>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    site: state.site
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Layout));
