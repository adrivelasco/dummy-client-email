const config = require('../config');
const isProduction = config.env === 'production';

// The require hook compiles CSS Modules in runtime. This is similar to Babel's babel/register.
require('css-modules-require-hook')({
  extensions: ['.css'],
  camelCase: 'dashes',
  generateScopedName: !isProduction
    ? '[name]-[local]-[hash:base64:5]'
    : '[hash:base64:5]'
});

const React = require('react');
const createElement = React.createElement;
const ReactDOM = require('react-dom/server');
const { StaticRouter } = require('react-router');
const { Provider } = require('react-redux');
const { JssProvider } = require('react-jss');
const { SheetsRegistry } = require('react-jss/lib/jss');
const { MuiThemeProvider, createGenerateClassName } = require('@material-ui/core/styles');
const { ConnectedRouter } = require('connected-react-router');

const createMuiTheme = require('../../core/createMuiTheme').default;
const configureStore = require('../../store/configureStore').default;
const App = require('../../components/App').default;
const Html = require('../../components/Html').default;

// Assets file map generated by Webpack
const assets = require('../../../build/assets.json');

/**
 * SSR Middleware for render html to client
 */
function renderHtml(req, res, next) {
  try {
    // Connected React Router doesn't support SSR. So this hack solve this problem at the momoment. Read more info:
    // https://github.com/supasate/connected-react-router/issues/39
    const staticRouter = new StaticRouter();
    staticRouter.props = { location: req.originalUrl, context: {} };
    const staticHistory = staticRouter.render().props.history;

    const state = {
      site: {
        title: config.app.title,
        description: config.app.description,
        favicon: config.app.favicon
      },
      user: {
        email: req.session.email,
        logged: req.session.token != null,
        token: req.session.token
      }
    };
    const store = configureStore(state, staticHistory);
    const context = { store };

    let status = 200;
    if (context.url) {
      status = 302;
      req.originalUrl = context.url;
    }
    if (context.status === '404') {
      status = 404;
    }

    // Create a sheetsRegistry instance.
    const sheetsRegistry = new SheetsRegistry();

    // Create a sheetsManager instance.
    const sheetsManager = new Map();

    // Create a theme instance.
    const theme = createMuiTheme();

    // Create a new class name generator.
    const generateClassName = createGenerateClassName();

    // React application skeleton
    const RootApp = ReactDOM.renderToString(createElement(
      JssProvider,
      { registry: sheetsRegistry, generateClassName },
      createElement(
        Provider,
        { store },
        createElement(
          ConnectedRouter,
          { history: staticHistory },
          createElement(
            MuiThemeProvider,
            { theme, sheetsManager },
            createElement(App)
          )
        )
      )
    ));

    // Pull the CSS out of the sheetsRegistry.
    const css = sheetsRegistry.toString();

    const html = `<!doctype html>${ReactDOM.renderToStaticMarkup(
      createElement(
        Html,
        {
          ...state.site,
          css,
          state: store.getState(),
          styles: [assets.client.css],
          scripts: [assets.vendor.js, assets.client.js]
        },
        RootApp
      )
    )}`;

    // Send the rendered page back to the client.
    res.status(status);
    res.send(html);
  } catch (err) {
    next(err);
  }
};

module.exports = renderHtml;
