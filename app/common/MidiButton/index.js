import React, { Component } from 'react';
import { initializeMidi, disconnectMidi } from '../../utils/midi';

class MidiButton extends Component {
    constructor () {
        super();
        this.state = { connected: false, connecting: false };
    }

    handleConnectClick() {
        if (this.state.connected) {
            disconnectMidi(() => {
                this.setState({ connected: false });
            })
        } else {
            this.setState({ connecting: true });
            initializeMidi(() => {
                this.setState({ connected: true, connecting: false });
            }, () => {
                this.setState({ connected: false, connecting: false });
            });
        }
    }

    render () {
        const { connected, connecting } = this.state;
        return <button disabled={connecting} onClick={this.handleConnectClick.bind(this)}>
            {connected ? 'disconnect' : 'connect midi'}
        </button>;
    }
}

export default MidiButton;
