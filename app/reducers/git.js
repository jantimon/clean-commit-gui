import { REPLACE_DIFF } from '../actions/git';

export default function git(state = {}, action) {
  switch (action.type) {
    case REPLACE_DIFF:
      return {
        diff: action.diff,
        repository: action.repository
      };
    default:
      return state;
  }
}
