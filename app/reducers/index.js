import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import git from './git';

const rootReducer = combineReducers({
  git,
  routing
});

export default rootReducer;
