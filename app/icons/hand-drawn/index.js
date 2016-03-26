import styles from './icons.scss';
import React, { Component } from 'react';

const iconNames = Object.keys(styles);

iconNames
  .filter((iconName) => iconName !== 'icon')
  .forEach((iconName) => {
    module.exports[iconName] = createIcon(iconName, styles[iconName]);
  });

function createIcon(iconName, className) {
  return class Icon extends Component {
    render() {
      return (<span className={className}></span>);
    }
  };
}
