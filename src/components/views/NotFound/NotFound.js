import React, { Component } from 'react';

import ScreenMessage from '../../ui/ScreenMessage';

/**
 * This component shows a 404 error message
 * @extends Component
 */
class NotFound extends Component {
  render() {
    return (
      <ScreenMessage>
        Site not found. Please, check the URL and try again.
      </ScreenMessage>
    );
  }
}

export default NotFound;
