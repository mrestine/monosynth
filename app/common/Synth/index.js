import './synth.scss';
import React, { Component } from 'react';
import { initSynth } from '../../utils/audioContext';
import * as names from '../../utils/nodeNames';
import presets from '../../presets';
import Arpeggiator from '../../nodes/arpeggiator';
import Chorus from '../../nodes/chorus';
import Delay from '../../nodes/delay';
import Distortion from '../../nodes/distortion';
import Envelope from '../../nodes/envelope';
import Filter from '../../nodes/filter';
import Glide from '../../nodes/glide';
import Keyboard from '../Keyboard';
import LFO from '../../nodes/lfo';
import Master from '../../nodes/master';
import Noise from '../../nodes/noise';
import Oscillator from '../../nodes/oscillator';
import Pan from '../../nodes/pan'
import Presets from '../Presets';
import Record from '../../nodes/record';
import Reverb from '../../nodes/reverb';

class Synth extends Component {

  constructor (props) {
    super();
    this.state = { preset: presets[0], initialized: false };
  }

  setPreset (preset) {
    this.setState({ preset: {...preset} });
  }

  initialize () {
    initSynth();
    this.setState({ initialized: true })
  }

  render () {
    const { keysPressed, preset, initialized } = this.state;
    const name = preset.name;
    const oscs = [
      { oscNode: names.OSC_1, gainNode: names.OSC_1_GAIN, pulseNode: names.PULSE_SHAPER_1 },
      { oscNode: names.OSC_2, gainNode: names.OSC_2_GAIN, pulseNode: names.PULSE_SHAPER_2 },
      { oscNode: names.OSC_3, gainNode: names.OSC_3_GAIN, pulseNode: names.PULSE_SHAPER_3 },
    ];
    const lfos = [
      { destDisplay: 'mod', oscNode: names.LFO_MOD_OSC, gainNode: names.LFO_MOD_GAIN, maxAmpl: 10 },
      { destDisplay: 'trem', oscNode: names.LFO_TREM_OSC, gainNode: names.LFO_TREM_GAIN, maxAmpl: 1 },
      { destDisplay: 'cutoff', oscNode: names.LFO_CUTOFF_OSC, gainNode: names.LFO_CUTOFF_GAIN, maxAmpl: 5000 },
    ];

    return <div id="root-wrap">
      <div className="title">
        monophonic synthesizer
        <div className="subtitle">using the web audio api and react by <a target="_blank" href="http://mattrestine.com">matt restine</a></div>
      </div>
      {initialized ? <div id="container">
        <div id="synth">
          <div className="row">
            {oscs.map((osc, i) => <Oscillator preset={name} key={i} oscNum={i+1} {...osc} {...preset.values.oscs[i]} />)}
          </div>
          <div className="row">
            {lfos.map((lfo, i) => <LFO preset={name} key={i} {...lfo} {...preset.values.lfos[i]} />)}
            <Filter preset={name} {...preset.values.filter} />
          </div>
          <div className="row">
            <Chorus preset={name} {...preset.values.chorus} />
            <Delay preset={name} {...preset.values.delay} />
            <Distortion preset={name} {...preset.values.distortion} />
            <Reverb preset={name} {...preset.values.reverb} />
            <Pan preset={name} {...preset.values.pan} />
          </div>
          <div className="row">
            <Arpeggiator preset={name} {...preset.values.arpeggiator} />
            <Envelope preset={name} {...preset.values.envelope} />
            <Glide preset={name} {...preset.values.glide} />
            <Noise preset={name} {...preset.values.noise} />
            <Master preset={name} {...preset.values.master} />
          </div>
          <div className="keyboard row">
            <Keyboard />
            <Record />
          </div>
        </div>
        <Presets presets={presets} selected={preset.name} onChange={this.setPreset.bind(this)} />
      </div> : <div id="container">
        <button onClick={this.initialize.bind(this)}>initialize</button>
      </div>}
    </div>;
  }
}

export default Synth;
