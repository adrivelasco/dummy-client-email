import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import ScreenMessage from '../../ui/ScreenMessage';
import ScrollableList from '../../ui/ScrollableList';
import styles from './Drafts.css';

/**
 * This component shows a list of all received emails
 * @extends Component
 */
class Drafts extends Component {
  static propTypes = {
    drafts: PropTypes.shape({
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
    this.props.history.push(`/compose/${id}`);
  }

  render() {
    const { drafts } = this.props;

    console.log(drafts.data);

    if (!drafts.data || drafts.data.length === 0) {
      return <ScreenMessage>There are no drafts</ScreenMessage>;
    }

    return (
      <div className={styles.root}>
        <ScrollableList
          items={drafts.data}
          onItemClickHandler={this.onEmailClick}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    drafts: state.emails.drafts
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Drafts));
