import styles from './styles/master.scss';
import React, { Component } from 'react';
import FieldSet from '../common/FieldSet';
import Knob from '../common/Knob';
import { setValue } from '../utils/audioContext';
import { MASTER } from '../utils/nodeNames';


class Master extends Component {

  constructor (props) {
    super();
    this.state = { gain: props.gain };
  }

  componentDidUpdate (prevProps) {
    const { gain, preset } = this.props;
    if (prevProps.preset !== preset) {
      this.handleGainChange(gain);
    }
  }

  handleGainChange (newGain) {
    this.setState({ gain: newGain });
    setValue(MASTER, 'gain', newGain);
  }

  render () {
    const { gain } = this.state;
    return <FieldSet legend="master" className="master">
      <Knob label="vol" min={0} max={1} step={0.01} value={gain} onChange={this.handleGainChange.bind(this)} />
    </FieldSet>;
  }
}

export default Master;
