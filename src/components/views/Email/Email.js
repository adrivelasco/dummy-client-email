import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';

import { actionGetEmailById } from '../../../actions/emails';
import styles from './Email.css';

/**
 * This component show email detail. Can be a compose mode or read-only mode.
 * @extends Component
 */
class Email extends Component {
  static propTypes = {
    email: PropTypes.shape({
      isFetching: PropTypes.bool,
      rejected: PropTypes.bool,
      data: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        subject: PropTypes.string,
        email: PropTypes.string
      })
    }).isRequired
  };

  /**
   * When component did mount, get email by id
   */
  componentDidMount() {
    this.props.dispatch(actionGetEmailById.fetch(this.props.match.params.email));
  }

  /**
   * Reset email view
   */
  componentWillUnmount() {
    this.props.dispatch(actionGetEmailById.reset());
  }

  render() {
    const { email } = this.props;

    if (!email.data || email.rejected) {
      return null;
    }

    if (email.isFetching) {
      return <CircularProgress />;
    }

    return (
      <Paper>
        <div className={styles.paper}>
          <TextField
            id="standard-bare"
            label="From"
            fullWidth={true}
            margin="normal"
            variant="outlined"
            InputProps={{
              readOnly: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            defaultValue={`${email.data.firstName} ${email.data.lastName} (${email.data.email})`}
          />
          <TextField
            id="standard-bare"
            label="Subject"
            fullWidth={true}
            margin="normal"
            variant="outlined"
            InputProps={{
              readOnly: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            defaultValue={email.data.subject}
          />
          <TextField
            multiline={true}
            id="standard-bare"
            label="Message"
            fullWidth={true}
            margin="normal"
            variant="outlined"
            rows={8}
            rowsMax={8}
            InputProps={{
              readOnly: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            defaultValue={email.data.message}
          />
        </div>
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    email: state.emails.single
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Email));
