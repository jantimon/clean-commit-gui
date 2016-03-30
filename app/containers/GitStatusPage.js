import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GitStatus from '../components/gitStatus/gitStatus';
import * as GitActions from '../actions/git';

function mapStateToProps(state) {
  return {
    staged: state.git.staged,
    unstaged: state.git.unstaged
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GitActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GitStatus);
