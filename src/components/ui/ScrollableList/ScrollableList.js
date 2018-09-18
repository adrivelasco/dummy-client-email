import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Typography, Paper } from '@material-ui/core';

class ScrollableList extends Component {
  render() {
    return (
      <Paper>
        <List>
          <ListItem button={true}>
            <div>
              <Typography variant="title">
                Title
              </Typography>
              <Typography component="p">
                Caption
              </Typography>
              <Typography component="p" color="textSecondary">Description</Typography>
            </div>
          </ListItem>
        </List>
      </Paper>
    );
  }
}

export default ScrollableList;
