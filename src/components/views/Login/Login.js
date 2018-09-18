import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Form from './Form';
import styles from './Login.css';

class Login extends Component {
  render() {
    return (
      <div className={styles.root}>
        <Paper className={styles.login}>
          <Typography variant="headline" component="h2">
            Login
          </Typography>
          <Typography component="p">
            Insert your credentials for access to the email
          </Typography>
          <Form />
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Login);
