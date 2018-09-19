import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Authenticated from './helpers/Authenticated';
import ScrollToTop from './helpers/ScrollToTop';
import Layout from './ui/Layout';
import views from './views';

class App extends Component {
  renderRouteComponent(props, view) {
    if (view.requireAuthentication) {
      return (
        <Authenticated history={props.history}>
          <view.component {...props} />
        </Authenticated>
      );
    }
    return <view.component {...props} />;
  }

  render() {
    return (
      <ScrollToTop>
        <Route render={({ location, history }) => (
          <Layout history={history} location={location}>
            <Switch>
              {views.map((view, i) => {
                return (
                  <Route
                    key={i}
                    path={view.path}
                    exact={view.exact}
                    pageName={view.title}
                    render={props => this.renderRouteComponent(props, view)}
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
