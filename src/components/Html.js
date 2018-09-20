import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';

class Html extends React.Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
    css: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    favicon: PropTypes.string.isRequired,
    state: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
    styles: PropTypes.arrayOf(PropTypes.string.isRequired)
  };

  static defaultProps = {
    styles: [],
    scripts: []
  };

  render() {
    const {
      children,
      css,
      description,
      favicon,
      scripts,
      state,
      styles,
      title
    } = this.props;
    return (
      <html className="no-js" lang="es">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <title>{title} | {description}</title>
          <meta name="description" content={description} />
          <link rel="shortcut icon" href={favicon} />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
          {styles.map((style, i) =>
            <link key={`${style}-${i}`} rel="stylesheet" href={style} />
          )}
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
          <style id="jss-server-side">{css}</style>
          <script dangerouslySetInnerHTML={{
            __html: `window.APP_STATE=${serialize(state)};`
          }} />
          {scripts.map((script, i) => <script key={`${script}-${i}`} src={script} />)}
        </body>
      </html>
    );
  }
}

export default Html;
