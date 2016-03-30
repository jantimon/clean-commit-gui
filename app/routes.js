import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import GitStatusPage from './containers/GitStatusPage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={GitStatusPage} />
  </Route>
);
