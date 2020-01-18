import React, { Component } from 'react';
import FieldSet from '../common/FieldSet';
import Knob from '../common/Knob';
import { setValue } from '../utils/audioContext';
import { GLIDE } from '../utils/nodeNames';

class Glide extends Component {

  constructor (props) {
    super();
    this.state = { glide: props.glide };
  }

  componentDidUpdate (prevProps) {
    const { glide, preset } = this.props;
    if (prevProps.preset !== preset) {
      this.handleGlideChange(glide);
    }
  }

  handleGlideChange (newGlide) {
    this.setState({ glide: newGlide });
    setValue(GLIDE, 'glide', newGlide);
  }

  render () {
    const { glide } = this.state;
    return <FieldSet legend="glide">
      <Knob label="exp" min={0} max={2} step={0.01} value={glide} onChange={this.handleGlideChange.bind(this)} />
    </FieldSet>;
  }
}

export default Glide;
