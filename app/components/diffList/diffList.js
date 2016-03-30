import { Component, PropTypes } from 'react';

import styles from './diffList.scss';
import template from './diffList.html';

export default class DiffList extends Component {
  static propTypes = {
    entries: PropTypes.array
  };

  getKey(patch) {
    return patch.newFile().path();
  }

  styles = styles;
  render = template;
}
