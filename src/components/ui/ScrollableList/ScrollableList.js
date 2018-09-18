import React, { Component } from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Typography, Paper } from '@material-ui/core';

class ScrollableList extends Component {
  static propTypes = {
    onItemClickHandler: PropTypes.func,
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
      message: PropTypes.string
    })).isRequired
  };

  static defaultProps = {
    items: []
  };

  /**
   * Execute click handler passed from props
   * @param {Object} event - Event Handler object
   * @param {Object} data - Extra information
   * @param {String|Number} data.id - Item ID
   */
  onItemClickHandler = (event, { id }) => {
    const { onItemClickHandler } = this.props;
    if (typeof onItemClickHandler === 'function') {
      onItemClickHandler(event, { id });
    }
  }

  render() {
    const { items } = this.props;
    return (
      <Paper>
        <List>
          {items.map(item => {
            return (
              <ListItem
                onClick={(event) => this.onItemClickHandler(event, item)}
                key={item.id}
                button={true}
              >
                <div>
                  <Typography variant="title">
                    {item.subject}
                  </Typography>
                  <Typography component="p">
                    {item.firstName} {item.lastName} - {item.email}
                  </Typography>
                  <Typography component="p" color="textSecondary">
                    {item.message}
                  </Typography>
                </div>
              </ListItem>
            );
          })}
        </List>
      </Paper>
    );
  }
}

export default ScrollableList;
