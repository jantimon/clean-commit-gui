import React, { Component, PropTypes } from 'react';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import TextField from 'material-ui/lib/text-field';


import styles from './gitCommitForm.scss';
import template from './gitCommitForm.html';

export default class GitCommitForm extends Component {
  static propTypes = {
    commitizen: PropTypes.oneOfType([
      React.PropTypes.boolean,
      React.PropTypes.object
    ])
  };

  constructor(props) {
    super(props);
    this.state = {
      answers: {}
    };
  }

  getForm() {
    const { commitizen } = this.props;
    if (!commitizen) {
      return '';
    }
    return commitizen.map((question) => {
      switch (question.type) {
        case 'list': {
          const options = question.choices.map((choice) => (
            <MenuItem value={choice.value} key={choice.value} primaryText={choice.name} />
          ));
          return (<div key={question.name}>
              <SelectField
                ref={question.name}
                fullWidth={true}
                value={this.state.answers[question.name]}
                onChange={this.handleFormChange.bind(this, question.name)}
                floatingLabelText={question.message}
              >
                {options}
              </SelectField>
            </div>);
        }
        case 'input': {
          const changeHelper = (event) =>
            this.handleFormChange(question.name, event, 0, this.refs[question.name].getValue());
          return (<div key={question.name}>
              <TextField
                ref={question.name}
                value={this.state.answers[question.name]}
                onChange={changeHelper}
                floatingLabelText={question.message}
                fullWidth={true}
                multiLine={true}
              />
            </div>);
        }
        default:
          return '';
      }
    });
  }

  handleFormChange(questionName, event, i, value) {
    const answers = Object.assign({}, this.state.answers, {
      [questionName]: value
    });
    this.setState({ answers });
  }

  styles = styles;
  render() {
    return template.call(this);
  }
}
