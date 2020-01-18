import React, { Component } from 'react';
import FieldSet from '../common/FieldSet';
import Select from '../common/Select';
import Knob from '../common/Knob';
import { setValue } from '../utils/audioContext';
import { FILTER } from '../utils/nodeNames';


class Filter extends Component {

  constructor (props) {
    super();
    const { type, frequency, Q, target, time } = props;
    this.state = { type, frequency, Q, target, time };
  }

  componentDidUpdate (prevProps) {
    const { type, frequency, Q, preset, target, time } = this.props;
    if (prevProps.preset !== preset) {
      this.handleTypeChange(type);
      this.handleFreqChange(frequency);
      this.handleQualChange(Q);
      this.handleTargetChange(target);
      this.handleTimeChange(time);
    }
  }

  handleTypeChange (newType) {
    this.setState({ type: newType });
    setValue(FILTER, 'type', newType);
  }
  handleFreqChange (newFreq) {
    this.setState({ frequency: newFreq });
    setValue(FILTER, 'frequency', newFreq);
  }
  handleQualChange (newQual) {
    this.setState({ Q: newQual });
    setValue(FILTER, 'Q', newQual);
  }
  handleTargetChange (newTarget) {
    this.setState({ target: newTarget });
    setValue(FILTER, 'target', newTarget);
  }
  handleTimeChange (newTime) {
    this.setState({ time: newTime });
    setValue(FILTER, 'time', newTime);
  }

  render () {
    const { type, frequency, Q, target, time } = this.state;
    const typeOptions = [
      { value: 'allpass', label: 'allpass' },
      { value: 'bandpass', label: 'bandpass' },
      { value: 'highpass', label: 'highpass' },
      { value: 'lowpass', label: 'lowpass' },
      { value: 'notch', label: 'notch' },
    ];

    return <FieldSet legend="filter">
      <Select options={typeOptions} value={type} onChange={this.handleTypeChange.bind(this)} />
      <Knob label="init_hz" min={10} max={22050} step={10} value={frequency} displayFix={0} onChange={this.handleFreqChange.bind(this)} />
      <Knob label="targ_hz" min={10} max={22050} step={10} value={target} displayFix={0} onChange={this.handleTargetChange.bind(this)} />
      <Knob label="time" min={0} max={5} step={0.01} value={time} displayFix={2} onChange={this.handleTimeChange.bind(this)} />
      <Knob label="qual" min={0.001} max={1} step={0.001} value={Q} displayFix={3} onChange={this.handleQualChange.bind(this)} />
    </FieldSet>;
  }
}

export default Filter;
