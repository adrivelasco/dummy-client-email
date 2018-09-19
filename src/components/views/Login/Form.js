import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';

import { usersLogin } from '../../../actions/users';
import { validateEmail } from '../../../utils';
import styles from './Form.css';

class Form extends Component {
  static propTypes = {
    onSuccess: PropTypes.func,
    auth: PropTypes.shape({
      rejected: PropTypes.bool
    }).isRequired
  };

  state = {
    email: '',
    password: ''
  };

  /**
   * Input change handler
   * @param {String} prop - Name of the input
   * @returns {Function}
   */
  onInputChangeHandler = prop => event => {
    this.setState({
      [prop]: event.target.value
    });
  };

  /**
   * Login user and dispatch an action with user data
   */
  onFormSubmit = async () => {
    try {
      const login = await this.props.dispatch(usersLogin({
        email: this.state.email,
        password: this.state.password
      }));
      if (login.results && login.results.logged &&
        typeof this.props.onSuccess === 'function') {
        this.props.onSuccess();
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Validate all the fields
   * @returns {Boolean} Validation result
   */
  validateForm() {
    let fieldsAreValid = true;

    // Check if a field is empty
    if (typeof Object.keys(this.state).find(key => this.state[key] === '') !== 'undefined') {
      fieldsAreValid = false;
    }

    // Check email format
    if (!validateEmail(this.state.email)) {
      fieldsAreValid = false;
    }

    return fieldsAreValid;
  }

  render() {
    const { auth } = this.props;
    return (
      <div className={styles.root}>
        <form>
          <div className={styles.fields}>
            <TextField
              error={auth.rejected}
              fullWidth={true}
              id="tf-email"
              label="Email address"
              margin="normal"
              onChange={this.onInputChangeHandler('email')}
              variant="outlined"
            />
            <TextField
              error={auth.rejected}
              fullWidth={true}
              id="tf-password"
              label="Password"
              margin="normal"
              onChange={this.onInputChangeHandler('password')}
              type="password"
              variant="outlined"
            />
            {auth.rejected && (
              <Typography
                color="error"
                component="p"
                gutterBottom={true}
                style={{ marginTop: '10px' }}
              >
                Las credenciales son inválidas
              </Typography>
            )}
            <div className={styles.submit}>
              <Button
                disabled={!this.validateForm()}
                color="primary"
                fullWidth={true}
                onClick={this.onFormSubmit}
                size="large"
                variant="contained"
              >
                Login
              </Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.users.auth
  };
}

export default connect(mapStateToProps)(Form);
