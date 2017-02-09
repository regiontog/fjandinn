import {app} from './app';
import {Jform} from './components/base';

import {React} from './react-helper';
import {Component} from 'react';
import {render} from 'react-dom';

require('../login.html')

const Login = app(class Login extends Component {
    render() {
        return <Jform action="/api/login" method="post" onResponse={this.response}>
            <input type="text" name="username" placeholder="Username"/>
            <input type="password" name="password" placeholder="Password"/>
            <input type="submit" value="Login"/>
        </Jform>;
    }

    response(res) {
        if (res.ok) {
            window.location = '/';
        }
    }
});

render(<Login/>, document.getElementById('content'));