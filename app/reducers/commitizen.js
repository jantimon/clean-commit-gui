import {
  COMMITIZEN_SETTINGS_CHANGED
} from '../actions/git';

export default function commitizen(state = { settings: false }, action) {
  console.log(action.type);
  switch (action.type) {
    case COMMITIZEN_SETTINGS_CHANGED:
      return Object.assign({}, state, { settings: action.commitizenSettings });
    default:
      return state;
  }
}
