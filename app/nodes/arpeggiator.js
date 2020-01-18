import './styles/arpeggiator.scss'
import React, { Component } from 'react';
import FieldSet from '../common/FieldSet';
import Select from '../common/Select';
import Toggle from '../common/Toggle';
import Knob from '../common/Knob';
import { setValue }  from '../utils/audioContext';
import { setArpeggiator } from '../utils/arpeggiator';

class Arpeggiator extends Component {

  constructor (props) {
    super();
    const { on, time, direction, octave } = props;
    this.state = { on, time, direction, octave };
  }

  componentDidUpdate (prevProps, prevState) {
    const { on, time, direction, octave, preset } = this.props;
    if (prevProps.preset !== preset) {
      this.handleOnChange(on);
      this.handleTimeChange(time);
      this.handleDirectionChange(direction);
      this.handleOctaveChange(octave);
    }
  }

  handleOnChange (newOn) {
    this.setState({ on: newOn });
    setArpeggiator({ on: newOn });
  }
  handleTimeChange (newTime) {
    this.setState({ time: newTime });
    setArpeggiator({ time: newTime*1000 });
  }
  handleDirectionChange (newDirection) {
    this.setState({ direction: newDirection });
    setArpeggiator({ direction: newDirection });
  }
  handleOctaveChange (newOctave) {
    this.setState({ octave: newOctave });
    setArpeggiator({ octave: newOctave });
  }

  render () {
    const { on, time, direction, octave } = this.state;
    const directionOptions = [
      { value: 'up', label: 'up' },
      { value: 'down', label: 'down' },
      { value: 'excl', label: 'excl' },
      { value: 'incl', label: 'incl' },
      { value: 'rand', label: 'rand' },
    ];

    return <FieldSet legend="arpeggiator" className="arp-wrap">
      <div className="arp-inner">
        <Toggle label="click" value={on} onChange={this.handleOnChange.bind(this)} className="arp-toggle" />
        <Select options={directionOptions} value={direction} onChange={this.handleDirectionChange.bind(this)} />
      </div>
      <div className="arp-inner">
        <Knob label="time" min={0.02} max={1} step={0.001} value={time} displayFix={3} onChange={this.handleTimeChange.bind(this)} />
      </div>
      <div className="arp-inner">
        <Knob label="oct" min={0} max={2} step={1} value={octave} displayFix={0} onChange={this.handleOctaveChange.bind(this)} />
      </div>
    </FieldSet>;
  }
}

export default Arpeggiator;
