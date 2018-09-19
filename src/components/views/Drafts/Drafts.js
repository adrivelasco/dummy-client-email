import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import ScrollableList from '../../ui/ScrollableList/ScrollableList';
import { actionGetAllEmails } from '../../../actions/emails';
import styles from './Drafts.css';

/**
 * This component shows a list of all received emails
 * @extends Component
 */
class Drafts extends Component {
  /**
   * Fetch all emails when component did mount
   */
  componentDidMount() {
    this.props.dispatch(actionGetAllEmails.fetch());
  }

  /**
   * Push history to Email View
   */
  onEmailClick = (_event, { id }) => {
    this.props.history.push(`/inbox/${id}`);
  }

  render() {
    const { allEmails } = this.props;
    if (!allEmails.data || allEmails.data.length === 0) {
      return <span />;
    }
    return (
      <div className={styles.root}>
        <ScrollableList
          items={allEmails.data}
          onItemClickHandler={this.onEmailClick}
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

export default withStyles(styles)(connect(mapStateToProps)(Drafts));
