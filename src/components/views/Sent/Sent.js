import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import ScreenMessage from '../../ui/ScreenMessage';
import ScrollableList from '../../ui/ScrollableList';
import styles from './Sent.css';

/**
 * This component shows a list of sent emails
 * @extends Component
 */
class Sent extends Component {
  static propTypes = {
    sent: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.shape({
        email: PropTypes.string,
        id: PropTypes.number,
        message: PropTypes.string,
        subject: PropTypes.string
      }))
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func
    }).isRequired
  };

  /**
   * Push history to Email View
   */
  onEmailClick = (_event, { id }) => {
    this.props.history.push(`/sent/${id}`);
  }

  render() {
    const { sent } = this.props;

    if (!sent.data || sent.data.length === 0) {
      return <ScreenMessage>There are no sent emails</ScreenMessage>;
    }

    return (
      <div className={styles.root}>
        <ScrollableList
          items={sent.data}
          onItemClickHandler={this.onEmailClick}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    sent: state.emails.sent
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Sent));
