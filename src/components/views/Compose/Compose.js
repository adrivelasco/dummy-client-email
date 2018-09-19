import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import { validateEmail } from '../../../utils';
import styles from './Compose.css';
import { actionSaveDraft } from '../../../actions/emails';

/**
 * This component show email detail. Can be a compose mode or read-only mode.
 * @extends Component
 */
class Compose extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  saveLocalDraftEveryTime = 10000;

  state = {
    to: '',
    subject: '',
    message: ''
  };

  /**
   * Submit form and sent email
   */
  sentEmail = () => {
    console.log('hola');
  }

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
    if (!validateEmail(this.state.to)) {
      fieldsAreValid = false;
    }

    return fieldsAreValid;
  }

  /**
   * When component did mount, set interval for store a local draft on redux
   */
  componentDidMount() {
    let timestamp = new Date().getTime();
    this.saveDraftTimer = setInterval(() => {
      this.props.dispatch(actionSaveDraft({ ...this.state, timestamp }));
    }, this.saveLocalDraftEveryTime);
  }

  /**
   * When component will unmount, clear timer to save draft
   */
  componentWillUnmount() {
    clearInterval(this.saveDraftTimer);
  }

  render() {
    console.log(this.props.drafts);
    return (
      <Paper>
        <div className={styles.paper}>
          <TextField
            id="sent-form-field-to"
            label="To"
            fullWidth={true}
            margin="normal"
            onChange={this.onInputChangeHandler('to')}
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            id="sent-form-field-subject"
            label="Subject"
            fullWidth={true}
            margin="normal"
            onChange={this.onInputChangeHandler('subject')}
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            multiline={true}
            id="sent-form-field-message"
            label="Message"
            fullWidth={true}
            margin="normal"
            onChange={this.onInputChangeHandler('message')}
            variant="outlined"
            rows={8}
            rowsMax={8}
            InputLabelProps={{
              shrink: true
            }}
          />
          <div className={styles.submit}>
            <Button
              disabled={!this.validateForm()}
              color="primary"
              variant="contained"
              onClick={this.sentEmail}
              size="large"
            >
              Sent email
            </Button>
          </div>
        </div>
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    drafts: state.emails.drafts,
    email: state.emails.single
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Compose));
