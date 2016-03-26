import React, { Component, PropTypes } from 'react';
import styles from './PatchTitle.scss';
import path from 'path';
import Icons from '../icons/hand-drawn';

class PatchTitle extends Component {
  static propTypes = {
    patch: PropTypes.object.isRequired
  };

  render() {
    const { patch } = this.props;
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
    const baseName = path.basename(filePath);
    const className = `${styles.default} ${activeModifier}`;
    return (<div className={className}>
        {icon}<span className={styles.title}>{baseName}</span>
      </div>);
  }
}

export default PatchTitle;
