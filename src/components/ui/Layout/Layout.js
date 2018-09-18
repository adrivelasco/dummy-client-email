import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import styles from './Layout.css';

class Layout extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  };

  static defaultProps = {
    title: 'Default title'
  };

  render() {
    const { children, title, classes } = this.props;
    return (
      <main>
        <Drawer
          anchor="left"
          classes={{
            paper: classes.paper
          }}
          variant="permanent"
        >
          <div className={classes.userinfo}>
            <Avatar
              alt="Adelle Charles"
            />
            <Typography variant="title" gutterBottom>
              Username
            </Typography>
            <Typography gutterBottom>
              test@getsirena.com
            </Typography>
          </div>
          <Divider />
          <MenuList>
            <MenuItem>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText inset primary="Inbox" />
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText inset primary="Sent mail" />
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText inset primary="Drafts" />
            </MenuItem>
          </MenuList>
        </Drawer>
        <div className={styles.frame}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="title" color="inherit">
                {title}
              </Typography>
            </Toolbar>
          </AppBar>
          <div className={classes.content}>
            {children}
          </div>
        </div>
      </main>
    );
  }
}

export default withStyles(styles)(Layout);
