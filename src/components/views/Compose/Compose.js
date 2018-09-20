import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Snackbar from '@material-ui/core/Snackbar';
import lightGreen from '@material-ui/core/colors/lightGreen';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import { validateEmail } from '../../../utils';
import { actionSaveDraft, actionRemoveDraft, actionSentEmail } from '../../../actions/emails';
import styles from './Compose.css';

/**
 * This component show email detail. Can be a compose mode or read-only mode.
 * @extends Component
 */
class Compose extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    drafts: PropTypes.shape({
      data: PropTypes.array
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        email: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      })
    })
  };

  timestamp;

  saveLocalDraftEveryTime = 2000;

  initialState = {
    email: '',
    subject: '',
    message: '',
    sucess: false
  };

  constructor(props) {
    super(props);

    this.state = props.match.params.email != null ? this.getDraft() : this.initialState;
  }

  /**
   * Get a draft to foward composing
   * @return {Object} Draft
   */
  getDraft() {
    const { drafts, match } = this.props;
    const emailId = Number(match.params.email);

    try {
      if (drafts.data && drafts.data.length > 0) {
        const foundDraft = drafts.data.find(draft => Number(draft.id) === emailId);
        this.timestamp = foundDraft.id;

        return foundDraft;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Submit form and sent email
   */
  sendEmail = () => {
    const email = {
      email: this.state.email,
      subject: this.state.subject,
      message: this.state.message,
      id: this.timestamp
    };
    this.setState(
      { ...this.initialState, success: true },
      () => {
        this.props.dispatch(actionRemoveDraft(email));
        this.props.dispatch(actionSentEmail(email));
      }
    );
  }

  /**
   * Reset success to false
   */
  onSnackbarClose = () => {
    this.setState({
      success: false
    });
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
    if (!validateEmail(this.state.email)) {
      fieldsAreValid = false;
    }

    return fieldsAreValid;
  }

  /**
   * When component did mount, set interval for store a local draft on redux
   */
  componentDidMount() {
    this.timestamp = this.timestamp || new Date().getTime();

    this.saveDraftTimer = setInterval(() => {
      if (this.validateForm()) {
        this.props.dispatch(actionSaveDraft({
          email: this.state.email,
          subject: this.state.subject,
          message: this.state.message,
          id: this.timestamp
        }));
      }
    }, this.saveLocalDraftEveryTime);
  }

  /**
   * When component will unmount, clear timer to save draft
   */
  componentWillUnmount() {
    clearInterval(this.saveDraftTimer);
  }

  render() {
    return (
      <Paper>
        <div className={styles.paper}>
          <TextField
            id="sent-form-field-email"
            label="To"
            fullWidth
            margin="normal"
            onChange={this.onInputChangeHandler('email')}
            variant="outlined"
            value={this.state.email}
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            id="sent-form-field-subject"
            label="Subject"
            fullWidth
            margin="normal"
            onChange={this.onInputChangeHandler('subject')}
            variant="outlined"
            value={this.state.subject}
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            multiline
            id="sent-form-field-message"
            label="Message"
            fullWidth
            margin="normal"
            onChange={this.onInputChangeHandler('message')}
            variant="outlined"
            rows={8}
            rowsMax={8}
            value={this.state.message}
            InputLabelProps={{
              shrink: true
            }}
          />
          <div className={styles.submit}>
            <Button
              disabled={!this.validateForm()}
              color="primary"
              variant="contained"
              onClick={this.sendEmail}
              size="large"
            >
              Send email
            </Button>
          </div>
        </div>
        <Snackbar
          className={styles.snackbar}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          open={this.state.success}
          autoHideDuration={4000}
          onClose={this.onSnackbarClose}
        >
          <SnackbarContent
            style={{
              color: '#ffffff',
              background: lightGreen['A700']
            }}
            aria-describedby="client-snackbar"
            message={
              <span id="client-snackbar" className={styles.snackbar__message}>
                <CheckCircleIcon className={styles.snackbar__icon} />
                ¡Email envíado con éxito!
              </span>
            }
          />
        </Snackbar>
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
