# Client UI Email :email:
> Simple personal email manager that allows you to: see inbox and sent an email. 

This is an [Universal React](https://medium.com/@muthuks/universal-rendering-with-react-60a7ca86820) Application. Consists in a very simple Client UI Email built with [Node.js](https://nodejs.org/) and [Express](https://github.com/expressjs/express) for server and the API REST, and in the other side, [React](https://github.com/facebook/react) for UI solution with [Redux](https://github.com/reduxjs/redux) for state management. Also uses other modern libraries such as [Material-UI](https://material-ui-next.com/), [PostCSS](https://github.com/postcss/postcss), [Babel 7](https://github.com/babel/babel) and [Webpack 4](https://webpack.github.io/).

## Requirements

  * Mac OS X, Windows, or Linux
  * [Node.js](https://nodejs.org/) v9.0 or newer
  * Text editor or IDE pre-configured with React/JSX/Flow/ESlint

## Directory Layout

Before you start, take a moment to see how the project structure looks like:

```
.
├── /node_modules/                  # 3rd-party libraries and utilities
├── /src/                           # Source code
│   ├── /actions/                   # Redux actions creators divided by feature
│   ├── /client/                    # Client entry point and specified 
│   ├── /components/                # Components separated by Helpers / UI / Views
│   ├── /core/                      # Other core frameworks
│   ├── /reducers/                  # Reducers for trigger that updates the Redux Store
│   ├── /server/                    # Node.js with Express server applica tion and API REST
│   ├── /store/                     # Contains a helper to build Redux store
│   └── /utils/                     # JS Utils
├── .babelrc                        # Plugins and extensions for Babel
├── .editorconfig                   # Configuration for your IDE used
├── .eslintrc.json                  # ESLint configuration and rules for code consistency!
├── .env.example                    # Environment variables
└── package.json                    # The list of 3rd party libraries and utilities
```

## Getting Started

1. Clone the repo and install all dependencies

```
$ git clone git@github.com:adrivelasco/dummy-client-email.git
$ cd dummy-client-email
$ npm install
```

2. Copy the `.env.example` content file to `.env` and configure it

3. Build and start server

  * Production mode
  ```
  $ npm run prod
  ```

  * Development mode (run tasks in parallel)
  ```
  $ npm run build:watch
  $ npm run start: watch
  ```

---
Made with ♥ by Adrián Velasco ([@adrivelasco](https://github.com/adrivelasco))