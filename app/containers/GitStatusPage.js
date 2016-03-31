import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GitStatus from '../components/gitStatus/gitStatus';
import GitCommitForm from '../components/gitCommitForm/gitCommitForm';
import * as GitActions from '../actions/git';

class GitStatusPage extends Component {
  render() {
    return (
      <div>
        <GitStatus {...this.props} />
        <br />
        <GitCommitForm {...this.props} />
      </div>
    );
  }
}

export default connect((state) => ({
  staged: state.git.staged,
  unstaged: state.git.unstaged,
  commitizen: state.commitizen.settings
}), (dispatch) => bindActionCreators(GitActions, dispatch))(GitStatusPage);
