import { Component } from 'react';
import { connect } from 'react-redux';

class Authenticated extends Component {
  componentDidMount() {
    this.checkAuth();
  }

  componentDidUpdate() {
    this.checkAuth();
  }

  /**
   * Check if user is authenticated
   */
  checkAuth() {}

  render() {
    return this.props.children;
  }
}

function mapStateToProps(state) {
  return {
    token: state.auth.token,
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps)(Authenticated);
