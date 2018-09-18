import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import ScrollableList from '../../ui/ScrollableList/ScrollableList';
import { actionGetAllEmails } from '../../../actions/emails';
import styles from './Inbox.css';

class Inbox extends Component {
  /**
   * Fetch all emails when component did mount
   */
  componentDidMount() {
    this.props.dispatch(actionGetAllEmails.fetch());
  }

  componentDidUpdate() {
    console.log(this.props.allEmails);
  }

  render() {
    const { allEmails } = this.props;
    if (!allEmails.data || allEmails.data.length === 0) {
      return null;
    }
    return (
      <div className={styles.root}>
        <ScrollableList
          items={allEmails.data}
        />
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
