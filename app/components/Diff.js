import React, { Component, PropTypes } from 'react';
import PatchTitle from './PatchTitle';
import styles from './Diff.scss';

class DiffView extends Component {
  static propTypes = {
    diff: PropTypes.array.isRequired,
    repository: PropTypes.object.isRequired,
  };

  render() {
    const { diff, repository } = this.props;
    const workdir = repository ? repository.workdir() : '';
    const patches = diff.map((patch) => {
      const key = (patch.isUntracked() ? 'T' : 'U') + ' ' + patch.newFile().path();
      return (<PatchTitle patch={patch} workdir={workdir} key={key} />);
    });
    return (
      <div className={styles.default}>
        {patches}
      </div>
    );
  }
}

export default DiffView;
