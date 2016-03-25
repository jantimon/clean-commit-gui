import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Diff from '../components/Diff';
import * as GitActions from '../actions/git';

function mapStateToProps(state) {
  return {
    diff: state.git
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GitActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Diff);
