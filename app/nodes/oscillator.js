import React, { Component } from 'react';
import FieldSet from '../common/FieldSet';
import Select from '../common/Select';
import Knob from '../common/Knob';
import { setValue } from '../utils/audioContext';


class Oscillator extends Component {

  constructor (props) {
    super();
    const { type, gain, detune, semitone, pulseWidth } = props;
    this.state = { type, gain, detune, semitone, pulseWidth };
  }

  componentDidUpdate (prevProps) {
    const { type, gain, detune, semitone, pulseWidth, preset } = this.props;
    if (prevProps.preset !== preset) {
      this.handleTypeChange(type);
      this.handleGainChange(gain);
      this.handleDetuneChange(detune);
      this.handleSemitoneChange(semitone);
      this.handlePulseWidthChange(pulseWidth);
    }
  }

  handleTypeChange (newType) {
    this.setState({ type: newType });
    setValue(this.props.oscNode, 'type', newType);
  }
  handleGainChange (newGain) {
    this.setState({ gain: newGain });
    setValue(this.props.gainNode, 'gain', newGain);
  }
  handleDetuneChange (newDetune) {
    this.setState({ detune: newDetune });
    setValue(this.props.oscNode, 'detune', newDetune);
  }
  handleSemitoneChange (newSemitone) {
    this.setState({ semitone: newSemitone });
    setValue(this.props.oscNode, 'semitone', newSemitone);
  }
  handlePulseWidthChange (newPulseWidth) {
    this.setState({ pulseWidth: newPulseWidth });
    setValue(this.props.pulseNode, 'pulseWidth', newPulseWidth);
  }

  render () {
    const { type, gain, semitone, detune, pulseWidth } = this.state;
    const { oscNum } = this.props;
    const typeOptions = [
      { value: 'pulse', label: 'pulse' },
      { value: 'sawtooth', label: 'sawtooth' },
      { value: 'sine', label: 'sine' },
      { value: 'square', label: 'square' },
      { value: 'triangle', label: 'triangle' },
    ];

    return <FieldSet legend={`osc ${oscNum}`}>
      <Select options={typeOptions} value={type} onChange={this.handleTypeChange.bind(this)} />
      <Knob label="detune" min={-50} max={50} step={1} value={detune} displayFix={0} onChange={this.handleDetuneChange.bind(this)} />
      <Knob label="step" min={-12} max={24} step={1} value={semitone} displayFix={0} onChange={this.handleSemitoneChange.bind(this)} />
      <Knob label="gain" min={0} max={1} step={0.01} value={gain} onChange={this.handleGainChange.bind(this)} />
      <Knob label="pwidth" min={0} max={100} step={1} displayFix={0} value={pulseWidth} onChange={this.handlePulseWidthChange.bind(this)} />
    </FieldSet>;
  }
}

export default Oscillator;
