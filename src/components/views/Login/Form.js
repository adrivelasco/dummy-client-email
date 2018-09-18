import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

import { usersLogin } from '../../../actions/users';

import styles from './Form.css';

class Form extends Component {
  state = {
    email: '',
    password: ''
  };

  onInputChangeHandler = prop => event => {
    this.setState({
      [prop]: event.target.value
    });
  };

  onFormSubmit = event => {
    console.log(this.state);
  }

  render() {
    return (
      <div className={styles.root}>
        <form>
          <div className={styles.fields}>
            <TextField
              fullWidth={true}
              id="tf-email"
              label="Email address"
              margin="normal"
              onChange={this.onInputChangeHandler('email')}
              variant="outlined"
            />
            <TextField
              fullWidth={true}
              id="tf-password"
              label="Password"
              margin="normal"
              onChange={this.onInputChangeHandler('password')}
              type="password"
              variant="outlined"
            />
            <div className={styles.submit}>
              <Button
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
    login: state.login
  };
}

export default connect(mapStateToProps)(Form);
