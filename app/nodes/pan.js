import React, { Component } from 'react';
import FieldSet from '../common/FieldSet';
import Knob from '../common/Knob';
import { setValue } from '../utils/audioContext';
import { PAN_PAN } from '../utils/nodeNames';


class Pan extends Component {

  constructor (props) {
    super();
    const { pan } = props;
    this.state = { pan };
  }

  componentDidUpdate (prevProps) {
    const { pan, preset } = this.props;
    if (prevProps.preset !== preset) {
      this.handlePanChange(pan);
    }
  }

  handlePanChange (newPan) {
    this.setState({ pan: newPan });
    setValue(PAN_PAN, 'pan', newPan);
  }

  render () {
    const { pan } = this.state;
    return <FieldSet legend="pan">
      <Knob label="l_r" min={-1} max={1} step={0.01} value={pan} onChange={this.handlePanChange.bind(this)} />
    </FieldSet>;
  }
}

export default Pan;
