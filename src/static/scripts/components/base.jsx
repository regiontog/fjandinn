/** @jsx h */

import { Component, h } from 'preact';

import formSerialize from 'form-serialize';

export class Jform extends Component {
    constructor(props) {
        super(props);

        this.formProps = Object.assign({}, props);
        this.onResponse = this.formProps.onResponse;
        delete this.formProps.onResponse;
    }

    render() {
        return <form
            ref={form => this.form = form}
            onSubmit={e => this.submit(e)}
            {...this.formProps}></form>;
    }

    submit(event) {
        event.preventDefault();
        event.stopPropagation();

        const json = formSerialize(this.form, { hash: true });

        fetch(this.props.action, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: this.props.method,
            body: JSON.stringify(json)
        })
            .then(this.onResponse)
            .catch(console.error);
    }
};
