import React, { Component } from 'react';
import FieldSet from '../common/FieldSet';
import Knob from '../common/Knob';
import { setValue } from '../utils/audioContext';
import { REVERB_WET_GAIN, REVERB_DRY_GAIN } from '../utils/nodeNames';


class Reverb extends Component {

  constructor (props) {
    super();
    const { wet, dry } = props;
    this.state = { wet, dry };
  }

  componentDidUpdate (prevProps) {
    const { wet, dry, preset } = this.props;
    if (prevProps.preset !== preset) {
      this.handleWetChange(wet);
      this.handleDryChange(dry);
    }
  }

  handleDryChange (newDry) {
    this.setState({ dry: newDry });
    setValue(REVERB_DRY_GAIN, 'gain', newDry);
  }
  handleWetChange (newWet) {
    this.setState({ wet: newWet });
    setValue(REVERB_WET_GAIN, 'gain', newWet);
  }

  render () {
    const { wet, dry } = this.state;
    return <FieldSet legend="reverb">
      <Knob label="wet" min={0} max={1} step={0.01} value={wet} onChange={this.handleWetChange.bind(this)} />
      <Knob label="dry" min={0} max={1} step={0.01} value={dry} onChange={this.handleDryChange.bind(this)} />
    </FieldSet>;
  }
}

export default Reverb;
