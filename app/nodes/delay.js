import React, { Component } from 'react';
import FieldSet from '../common/FieldSet';
import Knob from '../common/Knob';
import { setValue } from '../utils/audioContext';
import { DELAY_DELAY, DELAY_GAIN } from '../utils/nodeNames';


class Delay extends Component {

  constructor (props) {
    super();
    const { delay, gain } = props;
    this.state = { delay, gain };
  }

  componentDidUpdate (prevProps) {
    const { delay, gain, preset } = this.props;
    if (prevProps.preset !== preset) {
      this.handleDelayChange(delay);
      this.handleGainChange(gain);
    }    
  }

  handleDelayChange (newDelay) {
    this.setState({ delay: newDelay });
    setValue(DELAY_DELAY, 'delayTime', newDelay);
  }
  handleGainChange (newGain) {
    this.setState({ gain: newGain });
    setValue(DELAY_GAIN, 'gain', newGain);
  }

  render () {
    const { delay, gain } = this.state;
    return <FieldSet legend="delay">
      <Knob label="time" min={0.01} max={1} step={0.01} value={delay} onChange={this.handleDelayChange.bind(this)} />
      <Knob label="gain" min={0} max={0.9} step={0.05} value={gain} onChange={this.handleGainChange.bind(this)} />
    </FieldSet>;
  }
}

export default Delay;
