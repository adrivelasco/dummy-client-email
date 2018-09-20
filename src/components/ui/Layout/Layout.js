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
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { usersLogout } from '../../../actions/users';
import styles from './Layout.css';

/**
 * This component is the layout of the whole application. Shows an appbar and menu navigation
 * @extends Layout
 */
class Layout extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.shape({
      logged: PropTypes.bool,
      emai: PropTypes.string
    }).isRequired,
    site: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string
    }),
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func
    }).isRequired
  };

  drawerWidth = '300px';

  state = {
    width: typeof window !== 'undefined' ? window.innerWidth : '1024px',
    navigationOpen: false
  };

  /**
   * Push history to a link
   * @param {String} uri - New uri to push state
   */
  onItemMenuClick = (uri) => {
    this.props.history.push(uri);
  }

  /**
   * Shows menu navigation
   */
  onMenuButtonClick = (open) => {
    this.setState({
      navigationOpen: open
    });
  }

  /**
   * Handle scroll
   */
  componentDidMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  /**
   * Make sure to remove the listener
   * when the component is not mounted anymore
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  /**
   * Change width
   */
  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  /**
   * Logout user
   */
  logout() {
    this.props.dispatch(usersLogout());
  }

  render() {
    const { children, user, site } = this.props;
    const isMobile = this.state.width <= 768;
    return (
      <main>
        {user.logged && (
          <Drawer
            anchor="left"
            PaperProps={{
              style: { width: this.drawerWidth }
            }}
            open={this.state.navigationOpen}
            variant={isMobile ? 'temporary' : 'permanent'}
            onClose={() => isMobile ? this.onMenuButtonClick(false) : null}
          >
            <div className={styles.userinfo}>
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
        <div
          className={styles.frame}
          style={{
            width: user.logged && !isMobile ? `calc(100% - ${this.drawerWidth})` : ''
          }}
        >
          {user.logged && (
            <AppBar position={isMobile ? 'fixed' : 'static'}>
              <Toolbar>
                {isMobile && (
                  <IconButton
                    className={styles.menuButton}
                    color="inherit"
                    aria-label="Menu"
                    onClick={() => this.onMenuButtonClick(true)}
                  >
                    <MenuIcon />
                  </IconButton>
                )}
                <Typography variant="title" color="inherit">
                  {site.title} | {site.description}
                </Typography>
              </Toolbar>
            </AppBar>
          )}
          <div className={styles.view}>
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
