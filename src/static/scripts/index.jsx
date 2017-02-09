/** @jsx h */

import {app} from './app';

import {Component, render, h} from 'preact';

require('../index.html')

const Index = app(class Index extends Component {
    render() {
        return <p>Hello World!</p>;
    }
});

render(
    <Index/>, document.body);
