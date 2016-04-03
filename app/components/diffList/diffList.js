import { Component, PropTypes } from 'react';

import styles from './diffList.scss';
import template from './diffList.html';

export default class DiffList extends Component {
  static propTypes = {
    entries: PropTypes.array
  };

  getKey(patch) {
    return patch.id;
  }

  getEntries() {
    return this.props.entries;
  }

  styles = styles;
  render() { return template.call(this); }
}
