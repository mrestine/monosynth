import React, { Component } from 'react';
import FieldSet from '../common/FieldSet';
import Knob from '../common/Knob';
import { setValue } from '../utils/audioContext';
import { 
  CHORUS_DELAY_L, CHORUS_DELAY_R,
  CHORUS_DEPTH_L, CHORUS_DEPTH_R,
  CHORUS_OSC,
} from '../utils/nodeNames';


class Chorus extends Component {

  constructor (props) {
    super();
    const { delay, depth, speed } = props;
    this.state = { delay, depth, speed };
  }

  componentDidUpdate (prevProps) {
    const { delay, depth, speed, preset } = this.props;
    if (prevProps.preset !== preset) {
      this.handleDelayChange(delay);
      this.handleDepthChange(depth);
      this.handleSpeedChange(speed);
    }
  }

  handleDelayChange (newDelay) {
    this.setState({ delay: newDelay });
    setValue(CHORUS_DELAY_L, 'delayTime', newDelay / 1000);
    setValue(CHORUS_DELAY_R, 'delayTime', newDelay / 1000);
  }
  handleDepthChange (newDepth) {
    this.setState({ depth: newDepth });
    setValue(CHORUS_DEPTH_L, 'gain', newDepth / 100000);
    setValue(CHORUS_DEPTH_R, 'gain', newDepth / 100000);
  }
  handleSpeedChange (newSpeed) {
    this.setState({ speed: newSpeed });
    setValue(CHORUS_OSC, 'frequency', newSpeed);
  }

  render () {
    const { delay, depth, speed } = this.state;
    return <FieldSet legend="chorus">
      <Knob label="delay" min={0} max={100} step={1} value={delay} displayFix={0} onChange={this.handleDelayChange.bind(this)} />
      <Knob label="depth" min={0} max={100} step={1} value={depth} displayFix={0} onChange={this.handleDepthChange.bind(this)} />
      <Knob label="speed" min={0} max={10} step={0.1} value={speed} displayFix={1} onChange={this.handleSpeedChange.bind(this)} />
    </FieldSet>;
  }
}

export default Chorus;
