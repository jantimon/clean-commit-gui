import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import git from './git';
import commitizen from './commitizen';

const rootReducer = combineReducers({
  git,
  commitizen,
  routing
});

export default rootReducer;
