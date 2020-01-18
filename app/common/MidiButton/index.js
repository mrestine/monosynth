import React, { Component } from 'react';
import { initializeMidi } from '../../utils/midi';

class MidiButton extends Component {
    constructor () {
        super();
        this.state = { connected: false };
    }

    handleConnectClick() {
        initializeMidi(() => {
            this.setState({ connected: true });
        }, () => {
            this.setState({ connected: false });
        });
    }

    render () {
        const { connected } = this.state;
        return <button disabled={connected} onClick={this.handleConnectClick.bind(this)}>
            {connected ? 'connected' : 'connect midi'}
        </button>;
    }
}

export default MidiButton;
