import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import ScrollableList from '../../ui/ScrollableList/ScrollableList';
import styles from './Inbox.css';

class Inbox extends Component {
  /**
   * Fetch all emails when component did mount
   */
  componentDidMount() {

  }

  render() {
    return (
      <div className={styles.root}>
        <ScrollableList></ScrollableList>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    allEmails: state.emails.all
  };
}

export default withStyles(styles)(
  connect(mapStateToProps)(Inbox)
);
