import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

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
        email: PropTypes.number
      })
    })
  };

  timestamp;

  saveLocalDraftEveryTime = 2000;

  initialState = {
    email: '',
    subject: '',
    message: ''
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
    const emailId = match.params.email;

    console.log(drafts);

    if (drafts.data && drafts.data.length > 0) {
      const foundDraft = drafts.data.find(draft => draft.id === emailId);
      this.timestamp = foundDraft.id;

      console.log(foundDraft);

      return foundDraft;
    }
    return this.initialState;
  }

  /**
   * Submit form and sent email
   */
  sentEmail = () => {
    const email = { ...this.state, id: this.timestamp };
    this.setState(
      this.initialState, () => {
        this.props.dispatch(actionRemoveDraft(email));
        this.props.dispatch(actionSentEmail(email));
      }
    );
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
    console.log('hola');
    this.timestamp = new Date().getTime();

    this.saveDraftTimer = setInterval(() => {
      this.props.dispatch(actionSaveDraft({
        ...this.state,
        id: this.timestamp
      }));
    }, this.saveLocalDraftEveryTime);
  }

  /**
   * When component will unmount, clear timer to save draft
   */
  componentWillUnmount() {
    clearInterval(this.saveDraftTimer);
  }

  render() {
    console.log('JAJAJA');
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
              onClick={this.sentEmail}
              size="large"
            >
              Send email
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
