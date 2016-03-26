import 'babel-polyfill';

import path from 'path';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import queryString from 'query-string';
import routes from './routes';
import configureStore from './store/configureStore';
import syncGitWithStore from './utils/GitClient';
import './app.global.css';
import './utils/dragndrop';

const store = configureStore();
const query = queryString.parse(document.location.search);
syncGitWithStore({ store, path: path.resolve(query.cwd, query.git) });
const history = syncHistoryWithStore(hashHistory, store);

var d = document.createElement('p');
d.innerHTML = '<pre>' + path.resolve(query.cwd, query.git) + '</pre>';
document.body.appendChild(d);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
