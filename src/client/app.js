import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import JssProvider from 'react-jss/lib/JssProvider';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { MuiThemeProvider, createGenerateClassName } from '@material-ui/core/styles';

import App from '../components/App';
import createMuiTheme from '../core/createMuiTheme';
import configureStore from '../store/configureStore';
import history from './history';

const initialState = window.APP_STATE;
const store = configureStore(initialState, history);
const mountNode = document.getElementById('app');

// Create a new class name generator.
const generateClassName = createGenerateClassName();

// Generate a theme base on the options received.
const theme = createMuiTheme();

// Rendering Client Side
ReactDOM.hydrate(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <JssProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </JssProvider>
    </ConnectedRouter>
  </Provider>,
  mountNode
);

// Easy-to-use library for eliminating the 300ms delay between a
// physical tap and the firing of a click event on mobile browsers
FastClick.attach(document.body);

// Remove the server-side inject CSS
// const jssStyles = document.getElementById('jss-server-side');
// if (jssStyles && jssStyles.parentNode) {
//   jssStyles.parentNode.removeChild(jssStyles);
// }
