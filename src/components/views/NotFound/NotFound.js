import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import styles from './NotFound.css';

/**
 * This component shows a 404 error message
 * @extends Component
 */
class NotFound extends Component {
  render() {
    return (
      <div className={styles.root}>
        <Typography variant="subheading" gutterBottom>
          Site not found. Please, check the URL and try again.
        </Typography>
      </div>
    );
  }
}

export default NotFound;
