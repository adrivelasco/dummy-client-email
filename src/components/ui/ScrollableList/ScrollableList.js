import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import { ListItem, List, Typography, Paper, TextField, CircularProgress } from '@material-ui/core';

import styles from './ScrollableList.css';

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

  itemsByPage = 20;
  delaySearchTimer;

  initialState = {
    pageNumber: 1,
    items: this.props.items.length > 0
      ? this.paginate(this.props.items, this.itemsByPage, 1)
      : []
  }

  state = this.initialState;

  /**
   * Use Array.prototype.slice and just supply the params for (start, end) for paginate
   * @param {Array} array
   * @param {Number} pageSize - Length of paginated array
   * @param {Number} pageNumber - Current page number
   */
  paginate(array, pageSize, pageNumber) {
    --pageNumber; // because pages logically start with 1, but technically with 0
    return array.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
  }

  /**
   * Push new items to state items and update page number
   */
  loadMore = () => {
    this.setState(prevState => {
      const nextPageNumber = prevState.pageNumber + 1;
      const items = prevState.items;
      items.push(
        ...this.paginate(this.props.items, this.itemsByPage, nextPageNumber)
      );
      return {
        items: items,
        pageNumber: nextPageNumber
      };
    });
  }

  /**
   * Filter by email or name
   */
  onSearchbarChange = event => {
    const val = event.target.value;
    if (val !== '') {
      clearTimeout(this.delaySearchTimer);

      this.delaySearchTimer = setTimeout(() => {
        this.setState(prevState => {
          let items = prevState.items;
          items = items.filter(item => {
            return val === item.email || `${item.firstName} ${item.lastName}` === val;
          });
          return { items };
        });
      }, 1000);
    } else {
      this.setState(this.initialState);
    }
  }

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
    const { items } = this.state;
    const hasMore = items.length !== this.props.items.length;
    return (
      <div>
        <div className={styles.searchbar}>
          <TextField
            fullWidth={true}
            id="searchbar-field"
            label="Search by name or email"
            margin="normal"
            onChange={this.onSearchbarChange}
            variant="outlined"
          />
        </div>
        <Paper>
          <List>
            <InfiniteScroll
              loadMore={this.loadMore}
              threshold={100}
              hasMore={hasMore}
              loader={(
                <div
                  key={`${items.length + 1}-loader`}
                  className={styles.loader}
                >
                  <CircularProgress />
                </div>
              )}
            >
              {items.map((item, i) => {
                return (
                  <ListItem
                    onClick={(event) => this.onItemClickHandler(event, item)}
                    key={item.id}
                    button={true}
                    divider={items.length - 1 > i}
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
            </InfiniteScroll>
          </List>
        </Paper>
      </div>
    );
  }
}

export default ScrollableList;
