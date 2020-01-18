import React, { Component } from 'react';
import FieldSet from '../common/FieldSet';
import Select from '../common/Select';
import Knob from '../common/Knob';
import { setValue } from '../utils/audioContext';

class LFO extends Component {

  constructor (props) {
    super();
    const { type, frequency, amplitude } = props;
    this.state = { type, frequency, amplitude };
  }

  componentDidUpdate (prevProps) {
    const { type, frequency, amplitude, preset } = this.props;
    if (prevProps.preset !== preset) {
      this.handleTypeChange(type);
      this.handleFrequencyChange(frequency);
      this.handleAmplitudeChange(amplitude);
    }
  }

  handleTypeChange (newType) {
    this.setState({ type: newType });
    setValue(this.props.oscNode, 'type', newType);
  }
  handleFrequencyChange (newFrequency) {
    this.setState({ frequency: newFrequency });
    setValue(this.props.oscNode, 'frequency', newFrequency);
  }
  handleAmplitudeChange (newAmplitude) {
    this.setState({ amplitude: newAmplitude });
    setValue(this.props.gainNode, 'gain', newAmplitude);
  }

  render () {
    const { type, frequency, amplitude } = this.state;
    const { destDisplay, maxAmpl } = this.props;
    const typeOptions = [
      { value: 'sawtooth', label: 'sawtooth' },
      { value: 'sine', label: 'sine' },
      { value: 'square', label: 'square' },
      { value: 'triangle', label: 'triangle' },
    ];

    return <FieldSet legend={`${destDisplay} lfo`}>
      <Select options={typeOptions} value={type} onChange={this.handleTypeChange.bind(this)} />
      <Knob label="freq" min={0.01} max={10} step={0.01} value={frequency} onChange={this.handleFrequencyChange.bind(this)} />
      <Knob label="ampl" min={0} max={maxAmpl} step={0.01} value={amplitude} onChange={this.handleAmplitudeChange.bind(this)} />
    </FieldSet>;
  }
}

export default LFO;
