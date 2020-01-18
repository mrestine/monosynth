import React, { Component } from 'react';
import FieldSet from '../common/FieldSet';
import Knob from '../common/Knob';
import { setValue } from '../utils/audioContext';
import { NOISE_GAIN } from '../utils/nodeNames';


class Noise extends Component {
  
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
    setValue(NOISE_GAIN, 'gain', newGain);
  }

  render () {
    const { gain } = this.state;
    return <FieldSet legend="noise">
      <Knob label="gain" min={0} max={1} step={0.01} value={gain} onChange={this.handleGainChange.bind(this)} />
    </FieldSet>;
  }
}

export default Noise;
