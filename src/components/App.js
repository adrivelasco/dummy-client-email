import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Authenticated from './helpers/Authenticated';
import ScrollToTop from './helpers/ScrollToTop';
import Layout from './ui/Layout';
import views from './views';

/**
 * The top-level React component setting context (global) variables
 * that can be accessed from all the child components.
 */
class App extends Component {
  render() {
    return (
      <ScrollToTop>
        <Route render={({ location, history }) => (
          <Layout
            history={history}
            location={location}
          >
            <Switch>
              {views.map((view, i) => {
                return (
                  <Route
                    key={i}
                    path={view.path}
                    exact={view.exact}
                    pageName={view.title}
                    render={props => (
                      <Authenticated
                        private={view.requireAuthentication}
                        history={history}
                      >
                        <view.component {...props} />
                      </Authenticated>
                    )}
                  />
                );
              })}
            </Switch>
          </Layout>
        )} />
      </ScrollToTop>
    );
  }
}

export default App;
