import React, { Component, PropTypes } from 'react';
import styles from './PatchTitle.css';
import path from 'path';

class PatchTitle extends Component {
  static propTypes = {
    patch: PropTypes.object.isRequired
  };

  render() {
    const { patch } = this.props;
    const modifiers = [
      'isAdded',
      'isConflicted',
      'isCopied',
      'isDeleted',
      'isIgnored',
      'isModified',
      'isRenamed',
      'isTypeChange',
      'isUnmodified',
      'isUnreadable',
      'isUntracked'
    ];
    const activeModifiers = modifiers.filter((modifier) => patch[modifier]());
    const modfierStyles = activeModifiers.map((modifier) => styles[modifier]);
    const className = modfierStyles.join(' ');
    const filePath = patch.newFile().path();
    const baseName = path.basename(filePath);
    return (<div className={className}>
        <span>{baseName}</span>
      </div>);
  }
}

export default PatchTitle;
