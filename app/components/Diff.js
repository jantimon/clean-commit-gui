import React, { Component, PropTypes } from 'react';
import PatchTitle from './PatchTitle';
import styles from './Diff.scss';

class DiffView extends Component {
  static propTypes = {
    staged: PropTypes.array,
    unstaged: PropTypes.array
  };

  getStagedPatches() {
    const { staged } = this.props;
    return staged.map((patch) => {
      const key = patch.newFile().path();
      return (<PatchTitle patch={patch} key={key} />);
    });
  }

  getUnstagedPatches() {
    const { unstaged } = this.props;
    return unstaged.map((patch) => {
      const key = patch.newFile().path();
      return (<PatchTitle patch={patch} key={key} />);
    });
  }

  render() {
    return (
      <div>
        <div className={styles.default}>
          {this.getStagedPatches()}
        </div>
        <hr/>
        <div className={styles.default}>
          {this.getUnstagedPatches()}
        </div>
      </div>
    );
  }
}

export default DiffView;
