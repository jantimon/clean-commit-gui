import React, { Component, PropTypes } from 'react';
import styles from './PatchTitle.scss';
import path from 'path';
import Icons from '../icons/hand-drawn';

class PatchTitle extends Component {
  static propTypes = {
    patch: PropTypes.object.isRequired,
    workdir: PropTypes.string.isRequired
  };

  render() {
    const { patch, workdir } = this.props;
    const iconMapping = {
      isAdded: Icons.new,
      isDeleted: Icons.removed,
      isModified: Icons.modified,
      isRenamed: Icons.moved,
      isUntracked: Icons.untracked
    };

    let icon = '';
    let activeModifier = '';
    Object.keys(iconMapping).forEach((modifier) => {
      if (patch[modifier]()) {
        activeModifier = styles[modifier];
        icon = React.createElement(iconMapping[modifier], { key: modifier });
      }
    });

    const filePath = patch.newFile().path();
    const title = path.relative(workdir, filePath);
    const className = `${styles.default} ${activeModifier}`;
    return (<div className={className}>
        {icon}<span className={styles.title}>{title}</span>
      </div>);
  }
}

export default PatchTitle;
