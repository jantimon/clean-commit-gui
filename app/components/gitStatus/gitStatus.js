import { Component, PropTypes } from 'react';

import styles from './gitStatus.scss';
import template from './gitStatus.html';

export default class GitStatus extends Component {
  static propTypes = {
    staged: PropTypes.array,
    unstaged: PropTypes.array
  };

  styles = styles;
  render() { return template.call(this); }
}
