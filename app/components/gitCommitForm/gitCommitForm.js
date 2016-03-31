import React, { Component, PropTypes } from 'react';
import { Select, Placeholder, Option, TextInput } from 'belle';


import styles from './gitCommitForm.scss';
import template from './gitCommitForm.html';

export default class GitCommitForm extends Component {
  static propTypes = {
    commitizen: PropTypes.oneOfType([
      React.PropTypes.boolean,
      React.PropTypes.object
    ])
  };

  getForm() {
    const { commitizen } = this.props;
    if (!commitizen) {
      return '';
    }
    return commitizen.map((question) => {
      switch (question.type) {
        case 'list': {
          const options = question.choices.map((choice) => (
            <Option value={choice.value} key={choice.value}>{choice.name}</Option>
          ));
          return (<div key={question.name}>
              <Select>
                <Placeholder>{question.message}</Placeholder>
                {options}
              </Select>
            </div>);
        }
        case 'input':
          return (<div key={question.name}>
              <TextInput ref={question.name} placeholder={question.message} allowNewLine
              />
            </div>);
        default:
          return '';
      }
    });
  }

  styles = styles;
  render() {
    return template.call(this);
  }
}
