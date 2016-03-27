import { REPLACE_DIFF } from '../actions/git';

export default function git(state = {}, action) {
  switch (action.type) {
    case REPLACE_DIFF:
      return {
        staged: action.staged,
        unstaged: action.unstaged,
        repository: action.repository
      };
    default:
      return state;
  }
}
