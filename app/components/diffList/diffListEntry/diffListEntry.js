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

const titleMapping = {
  isAdded: 'new',
  isDeleted: 'deleted',
  isModified: 'modified',
  isRenamed: 'moved',
  isUntracked: 'new'
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
    const modifiers = Object.keys(patch.modifiers);
    const lastModifier = modifiers.length - 1;
    return lastModifier === -1 ? '' : React.createElement(iconMapping[modifiers[lastModifier]]);
  }

  /**
   * Returns the active modifier class name
   */
  getModifierClassName() {
    const { patch } = this.props;
    const modifiers = Object.keys(patch.modifiers);
    const lastModifier = modifiers.length - 1;
    return lastModifier === -1 ? styles.default : styles[modifiers[lastModifier]];
  }

  /**
   * Get the file title relative to the git root
   */
  getFilePath() {
    const { patch } = this.props;
    return patch.filename;
  }

  /**
   * Returns the file subtitle
   */
  getFileDetails() {
    const { patch } = this.props;
    const modifiers = Object.keys(titleMapping);
    for (let i = modifiers.length; i--;) {
      if (patch.modifiers[modifiers[i]]) {
        const suffix = modifiers[i] === 'isModified' ? ' - ' + this.getChangeAmount() : '';
        return titleMapping[modifiers[i]] + suffix;
      }
    }
    return '';
  }

  getChangeAmount() {
    const { patch } = this.props;
    return patch.size + ' change' + (patch.size !== 1 ? 's' : '');
  }

  styles = styles;
  render() { return template.call(this); }
}
