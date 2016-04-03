import React, { Component, PropTypes } from 'react';
import theme from '../theme';
import ThemeManager from 'material-ui/lib/styles/theme-manager';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  static childContextTypes = {
    muiTheme: React.PropTypes.object,
  };

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(theme)
    };
  }

  render() {
    return (
      <div>
        {this.props.children}
        {
          (() => {
            if (process.env.NODE_ENV !== 'production') {
              const DevTools = require('./DevTools');
              return <DevTools />;
            }
          })()
        }
      </div>
    );
  }
}
