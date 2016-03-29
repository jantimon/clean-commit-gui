import {
  WORKING_DIRECTORY_RESOLVING,
  WORKING_DIRECTORY_CHANGED,
  STAGED_DIFF_CHANGED,
  UNSTAGED_DIFF_CHANGED
} from '../actions/git';

export default function git(state = { staged: [], unstaged: [], resolving: false }, action) {
  switch (action.type) {
    case STAGED_DIFF_CHANGED:
      return Object.assign({}, state, { staged: action.stagedChanges });
    case UNSTAGED_DIFF_CHANGED:
      return Object.assign({}, state, { unstaged: action.unstagedChanges });
    case WORKING_DIRECTORY_RESOLVING:
      return Object.assign({}, state, { resolving: true });
    case WORKING_DIRECTORY_CHANGED:
      return Object.assign({}, state, { resolving: false, repository: action.repository });
    default:
      return state;
  }
}
