import './styles/click.scss'
import React, { Component } from 'react';
import FieldSet from '../common/FieldSet';
import Toggle from '../common/Toggle';
import Knob from '../common/Knob';
import { setValue } from '../utils/audioContext';
import { CLICK_GAIN } from '../utils/nodeNames';
import { registerStatusHandler, setClickSettings } from '../utils/recording';

class Record extends Component {

  constructor (props) {
    super();
    this.state = { 
      bpm: 120, 
      gain: 1,
      length: 8,
      status: 'stopped',
    };
    registerStatusHandler(this.handleStatusUpdate.bind(this));
  }

  handleBpmChange (newBpm) {
    const changed = setClickSettings({ bpm: newBpm });
    if (changed)
      this.setState({ bpm: newBpm });
  }
  handleLengthChange (newLength) {
    const changed = setClickSettings({ beats: newLength });
    if (changed)
      this.setState({ length: newLength });
  }
  handleClickGainChange (newGain) {
    setValue(CLICK_GAIN, 'gain', newGain);
    this.setState({ gain: newGain });
  }
  handleStatusUpdate (newStatus) {
    this.setState({ status: newStatus });
  }

  render () {
    const { bpm, gain, length, status } = this.state;

    return <FieldSet legend="record" className="click-wrap">
      <div className="click-inner">
        <Knob label="clk_vol" min={0} max={1} step={0.01} value={gain} displayFix={2} onChange={this.handleClickGainChange.bind(this)} className="click-gain" />
        <Knob label="bpm" min={40} max={240} step={1} value={bpm} displayFix={0} onChange={this.handleBpmChange.bind(this)} />
        <Knob label="beats" min={2} max={32} step={1} value={length} displayFix={0} onChange={this.handleLengthChange.bind(this)} />
      </div>
      <div>status: {status}</div>
    </FieldSet>;
  }
}

export default Record;
