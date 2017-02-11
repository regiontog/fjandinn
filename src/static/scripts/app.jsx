/** @jsx h */

import { Component, h } from 'preact';
import { getDisplayName } from './helper'

import style from './app.scss'

export function app(Component) {
  class App extends Component {
    render() {
      return <div>
        <nav>
          <ul>
            <li><a href='/index.html'>Home</a></li>
            <li><a href='/login.html'>Login</a></li>
          </ul>
        </nav>
        <Component {...this.props} />
      </div>;
    }
  }

  App.displayName = `App(${getDisplayName(Component)})`;
  return App;
}
