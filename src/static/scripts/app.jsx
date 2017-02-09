/** @jsx h */

import {Component, h} from 'preact';
import {getDisplayName} from './helper'

export function app(Component) {
  class App extends Component {
    render() {
      return <div>
        <h1>Dette er felles for alle sider</h1>
        <Component {...this.props}/>
      </div>;
    }
  }

  App.displayName = `App(${getDisplayName(Component)})`;
  return App;
}
