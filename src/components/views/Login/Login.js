import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Form from './Form';
import styles from './Login.css';

/**
 * This components shows a form to complete and access
 * @extends Component
 */
class Login extends Component {
  static propTypes = {
    user: PropTypes.shape({
      logged: PropTypes.bool
    }).isRequired
  };

  /**
   * Form action callback after complete form and get success
   */
  onSuccess = () => {
    this.redirectToInbox();
  }

  /**
   * Redirect to home
  */
  redirectToInbox = () => {
    this.props.history.push('/');
  }

  /**
   * Check if logged after mount component
   */
  componentDidMount() {
    if (this.props.user.logged) {
      this.redirectToInbox();
    }
  }

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
          <Form onSuccess={this.onSuccess} />
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Login));
