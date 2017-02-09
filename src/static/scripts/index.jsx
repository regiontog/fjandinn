import { app } from './app';

import { React } from './react-helper';
import { Component } from 'react';
import { render } from 'react-dom';

require('../index.html')

const Index = app(class Index extends Component {
    render() {
        return <p>Hello World!</p>;
    }
});

render(<Index />, document.getElementById('content'));