import React, { Component } from 'react';
import FieldSet from '../common/FieldSet';
import Knob from '../common/Knob';
import { setValue } from '../utils/audioContext';
import { ENV_GAIN } from '../utils/nodeNames';

class Envelope extends Component {

  constructor (props) {
    super();
    const { attack, decay, sustain, release } = props;
    this.state = { attack, decay, sustain, release };
  }

  componentDidUpdate (prevProps) {
    const { attack, decay, sustain, release, preset } = this.props;
    if (prevProps.preset !== preset) {
      this.handleAttackChange(attack);
      this.handleDecayChange(decay);
      this.handleSustainChange(sustain);
      this.handleReleaseChange(release);
    }
  }

  handleAttackChange (newAttack) {
    this.setState({ attack: newAttack });
    setValue(ENV_GAIN, 'attack', newAttack);
  }
  handleDecayChange (newDecay) {
    this.setState({ decay: newDecay });
    setValue(ENV_GAIN, 'decay', newDecay);
  }
  handleSustainChange (newSustain) {
    this.setState({ sustain: newSustain });
    setValue(ENV_GAIN, 'sustain', newSustain);
  }
  handleReleaseChange (newRelease) {
    this.setState({ release: newRelease });
    setValue(ENV_GAIN, 'release', newRelease);
  }

  render () {
    const { attack, decay, sustain, release } = this.state;
    return <FieldSet legend="envelope">
      <Knob label="atk" min={0} max={1} step={0.01} value={attack} onChange={this.handleAttackChange.bind(this)} />
      <Knob label="dec" min={0} max={1} step={0.01} value={decay} onChange={this.handleDecayChange.bind(this)} />
      <Knob label="sus" min={0} max={1} step={0.01} value={sustain} onChange={this.handleSustainChange.bind(this)} />
      <Knob label="rel" min={0} max={1} step={0.01} value={release} onChange={this.handleReleaseChange.bind(this)} />
    </FieldSet>
  }
}

export default Envelope;
