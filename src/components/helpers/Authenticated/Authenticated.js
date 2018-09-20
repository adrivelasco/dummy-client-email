import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * This component wraps the view and check if user is logged when component is mounted or is updated
 * @extends Component
 */
class Authenticated extends Component {
  static propTypes = {
    children: PropTypes.node,
    token: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    private: PropTypes.bool,
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
    if (this.props.private && !this.props.isAuthenticated) {
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
