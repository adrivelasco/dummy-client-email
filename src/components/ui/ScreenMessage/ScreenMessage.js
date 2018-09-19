import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import styles from './ScreenMessage.css';

/**
 * This component shows a screen message
 * @extends Component
 */
class ScreenMessage extends Component {
  static propTypes = {
    children: PropTypes.string
  };

  render() {
    return (
      <div className={styles.root}>
        <Typography variant="subheading" gutterBottom>
          {this.props.children}
        </Typography>
      </div>
    );
  }
}

export default ScreenMessage;
