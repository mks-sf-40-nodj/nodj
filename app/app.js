import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { fade } from 'material-ui/utils/colorManipulator';
import {
  blueGrey50,
  blueGrey100,
  blueGrey500,
  blueGrey600,
  blueGrey700,
  yellow700,
  lightBlue500,
  lightBlue50,
  cyan500,
  cyan700,
  grey400,
  pinkA200,
  grey100,
  grey500,
  darkBlack,
  white,
  grey300,
  fullBlack,
  lightGreen400
} from 'material-ui/styles/colors';

import JobPlus from './components/job-plus';
import reducers from './reducers/index';

const routerMid = routerMiddleware(browserHistory);
// const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, routerMid)(createStore);
// const store = createStoreWithMiddleware(reducers);
const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk, promiseMiddleware, routerMid)
  ),
);
const history = syncHistoryWithStore(browserHistory, store);

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#6C7A89',
    primary2Color: '#6C7A89',
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    pickerHeaderColor: lightBlue500,
    shadowColor: fullBlack
  },
  appBar: {
    height: 56,
  },
});

class App extends Component {
  render() {
    return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <Provider store={store}>
            <Router history={history}>
              <Route path="/" component={JobPlus} />
            </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
