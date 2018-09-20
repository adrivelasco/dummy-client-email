import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import ScrollableList from '../../ui/ScrollableList/ScrollableList';
import { actionGetAllEmails } from '../../../actions/emails';
import styles from './Inbox.css';

/**
 * This component shows a list of all received emails
 * @extends Component
 */
class Inbox extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func
    }).isRequired,
    allEmails: PropTypes.shape({
      data: PropTypes.array
    }).isRequired
  };

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

  /**
   * Push history to Sent View
   */
  onAddClick = () => {
    this.props.history.push('/compose');
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
        <div className={styles.add}>
          <Button
            onClick={this.onAddClick}
            variant="fab"
            color="primary"
            aria-label="Add"
          >
            <AddIcon />
          </Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    allEmails: state.emails.all
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Inbox));
