import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Authenticated extends Component {
  static propTypes = {
    token: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  };

  componentDidMount() {
    this.checkAuth();
  }

  componentDidUpdate() {
    this.checkAuth();
  }

  /**
   * Check if user is authenticated
   */
  checkAuth() {
    if (!this.props.isAuthenticated) {
      this.props.history.push('/login');
    }
  }

  render() {
    return this.props.children;
  }
}

function mapStateToProps(state) {
  return {
    token: state.user.token,
    isAuthenticated: state.user.logged
  };
};

export default connect(mapStateToProps)(Authenticated);
