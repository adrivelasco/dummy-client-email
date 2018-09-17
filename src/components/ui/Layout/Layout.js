import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class Layout extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  };

  static defaultProps = {
    title: 'Default title'
  };

  render() {
    const { children, title } = this.props;
    return (
      <main>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        {children}
      </main>
    );
  }
}

export default Layout;
