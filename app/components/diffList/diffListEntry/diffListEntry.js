import React, { Component, PropTypes } from 'react';
import Icons from '../../icons/hand-drawn';

import styles from './diffListEntry.scss';
import template from './diffListEntry.html';

const iconMapping = {
  isAdded: Icons.new,
  isDeleted: Icons.removed,
  isModified: Icons.modified,
  isRenamed: Icons.moved,
  isUntracked: Icons.untracked
};

export default class DiffListEntry extends Component {
  static propTypes = {
    patch: PropTypes.object.isRequired,
  };

  /**
   * Returns the active modifier icon
   * @see iconMapping for details
   */
  getModifierIcon() {
    const { patch } = this.props;
    const modifiers = Object.keys(iconMapping);
    for (let i = modifiers.length; i--;) {
      if (patch[modifiers[i]]()) {
        return React.createElement(iconMapping[modifiers[i]]);
      }
    }
    return '';
  }

  /**
   * Returns the active modifier class name
   */
  getModifierClassName() {
    const { patch } = this.props;
    const modifiers = Object.keys(iconMapping);
    for (let i = modifiers.length; i--;) {
      if (patch[modifiers[i]]()) {
        return styles[modifiers[i]];
      }
    }
    return styles.default;
  }

  /**
   * Get the file title relative to the git root
   */
  getFilePath() {
    const { patch } = this.props;
    return patch.newFile().path();
  }

  styles = styles;
  render = template;
}
