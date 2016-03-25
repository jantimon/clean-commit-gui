import { REPLACE_DIFF } from '../actions/git';

export default function git(state = [], action) {
  console.log(action, state, REPLACE_DIFF);
  switch (action.type) {
    case REPLACE_DIFF:
      return action.diff;
    default:
      return state;
  }
}
