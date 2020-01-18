import React, { Component } from 'react';
import FieldSet from '../common/FieldSet';
import Knob from '../common/Knob';
import { setValue } from '../utils/audioContext';
import { DIST_DIST, DIST_GAIN } from '../utils/nodeNames';

class Distortion extends Component {

  constructor (props) {
    super();
    const { k, gain } = props;
    this.state = { k, gain };
  }

  componentDidUpdate (prevProps) {
    const { k, gain, preset } = this.props;
    if (prevProps.preset !== preset) {
      this.handleDistChange(k);
      this.handleGainChange(gain);
    }
  }

  handleDistChange (newDist) {
    this.setState({ k: newDist });
    setValue(DIST_DIST, 'distortionCurve', newDist);
  }
  handleGainChange (newGain) {
    this.setState({ gain: newGain });
    setValue(DIST_GAIN, 'gain', newGain);
  }

  render () {
    const { k, gain } = this.state;
    return <FieldSet legend="distortion">
      <Knob label="k" min={0} max={100} step={1} value={k} displayFix={0} onChange={this.handleDistChange.bind(this)} />
      <Knob label="vol" min={0} max={1} step={0.01} value={gain} onChange={this.handleGainChange.bind(this)} />
    </FieldSet>;
  }
}

export default Distortion;
