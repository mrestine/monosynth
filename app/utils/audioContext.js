import _ from 'lodash';
import * as names from './nodeNames';
import impulse_response from './impulse_response';
import notes, { getSemitoneFrequency } from './notes';
import { initKeyboard } from './keyboard';
import clickUrl from './click.mp3';

let ctx = null;
let nodes = {};
let clickBuffer = null;

let envelope = {
  attack: 0,
  decay: 0,
  sustain: 1,
  release: 0,
};
let currentNote = 'A4';
let semitones = {
  [names.OSC_1]: 0,
  [names.OSC_2]: 0,
  [names.OSC_3]: 0,
};
let glide = 0;
let filterEnv = {
  initial: 10,
  target: 10,
  time: 0,
};

const initSynth = () => {
  ctx = new AudioContext();

  // before creating the nodes, get and decode the click because it's asynchronous.
  let req = new XMLHttpRequest();
  req.open('GET', './' + clickUrl, true);
  req.responseType = 'arraybuffer';
  req.onload = () => {
    ctx.decodeAudioData(req.response).then(decoded => {
      clickBuffer = decoded;
    });
  };
  req.send();

  // make da noise with the oscillators
  nodes[names.OSC_1] = ctx.createOscillator();
  nodes[names.OSC_1_GAIN] = ctx.createGain();
  nodes[names.OSC_2] = ctx.createOscillator();
  nodes[names.OSC_2_GAIN] = ctx.createGain();
  nodes[names.OSC_3] = ctx.createOscillator();
  nodes[names.OSC_3_GAIN] = ctx.createGain();
  nodes[names.OSC_EXIT] = ctx.createGain();

  // noise and pulse shapers
  nodes[names.NOISE] = ctx.createBufferSource();
  nodes[names.NOISE_GAIN] = ctx.createGain();
  nodes[names.PULSE_SHAPER_1] = ctx.createWaveShaper();
  nodes[names.PULSE_SHAPER_2] = ctx.createWaveShaper();
  nodes[names.PULSE_SHAPER_3] = ctx.createWaveShaper();

  // modulate with LFOs
  nodes[names.LFO_MOD_OSC] = ctx.createOscillator();
  nodes[names.LFO_MOD_GAIN] = ctx.createGain();
  nodes[names.LFO_TREM_OSC] = ctx.createOscillator();
  nodes[names.LFO_TREM_GAIN] = ctx.createGain();
  nodes[names.LFO_CUTOFF_OSC] = ctx.createOscillator();
  nodes[names.LFO_CUTOFF_GAIN] = ctx.createGain();

  // envelope and filtering
  nodes[names.ENV_GAIN] = ctx.createGain();
  nodes[names.FILTER] = ctx.createBiquadFilter();

  // chorus effect
  nodes[names.CHORUS_INPUT] = ctx.createGain();
  nodes[names.CHORUS_SPLITTER] = ctx.createChannelSplitter(2);
  nodes[names.CHORUS_MERGER] = ctx.createChannelMerger(2);
  nodes[names.CHORUS_WET_GAIN] = ctx.createGain();
  nodes[names.CHORUS_DELAY_L] = ctx.createDelay();
  nodes[names.CHORUS_DELAY_R] = ctx.createDelay();
  nodes[names.CHORUS_DEPTH_L] = ctx.createGain();
  nodes[names.CHORUS_DEPTH_R] = ctx.createGain();
  nodes[names.CHORUS_OSC] = ctx.createOscillator();

  // delay effect
  nodes[names.DELAY_SPLIT] = ctx.createGain();
  nodes[names.DELAY_GAIN] = ctx.createGain();
  nodes[names.DELAY_DELAY] = ctx.createDelay(2.0);
  nodes[names.DELAY_EXIT] = ctx.createGain();

  // reverb effect
  nodes[names.REVERB_SPLIT] = ctx.createGain();
  nodes[names.REVERB_DRY_GAIN] = ctx.createGain();
  nodes[names.REVERB_WET_GAIN] = ctx.createGain();
  nodes[names.REVERB_REVERB] = ctx.createConvolver();
  nodes[names.REVERB_EXIT] = ctx.createGain();

  // pan
  nodes[names.PAN_PAN] = ctx.createStereoPanner();

  // distortion effect
  nodes[names.DIST_DIST] = ctx.createWaveShaper();
  nodes[names.DIST_GAIN] = ctx.createGain();

  // analyser
  //nodes[names.ANALYSER] = ctx.createAnalyser();

  // click
  nodes[names.CLICK_GAIN] = ctx.createGain();

  // master volume
  nodes[names.MASTER] = ctx.createGain();

  // connect the dots
  // oscillators
  nodes[names.OSC_1_GAIN].gain.value = 0.5;
  nodes[names.OSC_1].connect(nodes[names.OSC_1_GAIN]);
  nodes[names.OSC_1_GAIN].connect(nodes[names.OSC_EXIT]);
  nodes[names.OSC_1].start();
  nodes[names.OSC_2_GAIN].gain.value = 0;
  nodes[names.OSC_2].connect(nodes[names.OSC_2_GAIN]);
  nodes[names.OSC_2_GAIN].connect(nodes[names.OSC_EXIT]);
  nodes[names.OSC_2].start();
  nodes[names.OSC_3_GAIN].gain.value = 0;
  nodes[names.OSC_3].connect(nodes[names.OSC_3_GAIN]);
  nodes[names.OSC_3_GAIN].connect(nodes[names.OSC_EXIT]);
  nodes[names.OSC_3].start();

  // noise
  const bufferSize = ctx.sampleRate * 1;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  let noiseData = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    noiseData[i] = Math.random() * 2 - 1;
  }
  nodes[names.NOISE].buffer = buffer;
  nodes[names.NOISE].loop = true;
  nodes[names.NOISE].connect(nodes[names.NOISE_GAIN]);
  nodes[names.NOISE_GAIN].gain.value = 0;
  nodes[names.NOISE_GAIN].connect(nodes[names.OSC_EXIT]);
  nodes[names.NOISE].start();

  //oh, create the pulse wave.
  nodes[names.PULSE_SHAPER_1].curve = _createPulseCurve(25);
  nodes[names.PULSE_SHAPER_2].curve = _createPulseCurve(25);
  nodes[names.PULSE_SHAPER_3].curve = _createPulseCurve(25);

  // LFOs - trem, mod, cutoff
  nodes[names.LFO_TREM_GAIN].gain.value = 0;
  nodes[names.LFO_TREM_OSC].frequency.value = 1;
  nodes[names.LFO_TREM_OSC].connect(nodes[names.LFO_TREM_GAIN]);
  nodes[names.LFO_TREM_GAIN].connect(nodes[names.OSC_EXIT].gain);
  nodes[names.LFO_TREM_OSC].start();
  nodes[names.LFO_MOD_GAIN].gain.value = 0;
  nodes[names.LFO_MOD_OSC].frequency.value = 1;
  nodes[names.LFO_MOD_OSC].connect(nodes[names.LFO_MOD_GAIN]);
  nodes[names.LFO_MOD_GAIN].connect(nodes[names.OSC_1].frequency);
  nodes[names.LFO_MOD_GAIN].connect(nodes[names.OSC_2].frequency);
  nodes[names.LFO_MOD_GAIN].connect(nodes[names.OSC_3].frequency);
  nodes[names.LFO_MOD_OSC].start();
  nodes[names.LFO_CUTOFF_GAIN].gain.value = 0;
  nodes[names.LFO_CUTOFF_OSC].frequency.value = 1;
  nodes[names.LFO_CUTOFF_OSC].connect(nodes[names.LFO_CUTOFF_GAIN]);
  nodes[names.LFO_CUTOFF_GAIN].connect(nodes[names.FILTER].frequency);
  nodes[names.LFO_CUTOFF_OSC].start();

  // envelope
  nodes[names.ENV_GAIN].gain.value = 0;
  nodes[names.OSC_EXIT].connect(nodes[names.ENV_GAIN]);

  // effects, starting with chorus
  nodes[names.ENV_GAIN].connect(nodes[names.CHORUS_INPUT]);
  nodes[names.CHORUS_INPUT].connect(nodes[names.CHORUS_SPLITTER]);
  nodes[names.CHORUS_INPUT].connect(nodes[names.CHORUS_WET_GAIN]);
  nodes[names.CHORUS_DELAY_L].delayTime.value = 0;
  nodes[names.CHORUS_DELAY_R].delayTime.value = 0;
  nodes[names.CHORUS_SPLITTER].connect(nodes[names.CHORUS_DELAY_L], 0);
  nodes[names.CHORUS_SPLITTER].connect(nodes[names.CHORUS_DELAY_R], 1);
  nodes[names.CHORUS_DEPTH_L].gain.value = 0;
  nodes[names.CHORUS_DEPTH_R].gain.value = 0;
  nodes[names.CHORUS_OSC].type = 'triangle';
  nodes[names.CHORUS_OSC].frequency.value = 0;
  nodes[names.CHORUS_OSC].connect(nodes[names.CHORUS_DEPTH_L]);
  nodes[names.CHORUS_OSC].connect(nodes[names.CHORUS_DEPTH_R]);
  nodes[names.CHORUS_DEPTH_L].connect(nodes[names.CHORUS_DELAY_L].delayTime);
  nodes[names.CHORUS_DEPTH_R].connect(nodes[names.CHORUS_DELAY_R].delayTime);
  nodes[names.CHORUS_DELAY_L].connect(nodes[names.CHORUS_MERGER], 0, 0);
  nodes[names.CHORUS_DELAY_R].connect(nodes[names.CHORUS_MERGER], 0, 1);
  nodes[names.CHORUS_MERGER].connect(nodes[names.CHORUS_WET_GAIN]);
  nodes[names.CHORUS_OSC].start();

  // now delay
  nodes[names.CHORUS_WET_GAIN].connect(nodes[names.DELAY_SPLIT]);
  nodes[names.DELAY_GAIN].gain.value = 0;
  nodes[names.DELAY_DELAY].delayTime.value = 1.0;
  nodes[names.DELAY_SPLIT].connect(nodes[names.DELAY_EXIT]);
  nodes[names.DELAY_SPLIT].connect(nodes[names.DELAY_GAIN]);
  nodes[names.DELAY_GAIN].connect(nodes[names.DELAY_DELAY]);
  nodes[names.DELAY_DELAY].connect(nodes[names.DELAY_SPLIT]);

  // ok, reverb
  nodes[names.DELAY_EXIT].connect(nodes[names.REVERB_SPLIT]);
  nodes[names.REVERB_SPLIT].connect(nodes[names.REVERB_DRY_GAIN]);
  nodes[names.REVERB_SPLIT].connect(nodes[names.REVERB_WET_GAIN]);
  nodes[names.REVERB_DRY_GAIN].connect(nodes[names.REVERB_EXIT]);
  nodes[names.REVERB_DRY_GAIN].gain.value = 1;
  nodes[names.REVERB_WET_GAIN].gain.value = 0;
  nodes[names.REVERB_WET_GAIN].connect(nodes[names.REVERB_REVERB]);
  nodes[names.REVERB_REVERB].connect(nodes[names.REVERB_EXIT]);
  ctx.decodeAudioData(_createReverbBuffer(), buffer => {
    nodes[names.REVERB_REVERB].buffer = buffer;
  }, e => console.log('error creating reverb', e));

  // cool. distortion.
  nodes[names.REVERB_EXIT].connect(nodes[names.DIST_DIST]);
  nodes[names.DIST_DIST].connect(nodes[names.DIST_GAIN]);
  nodes[names.DIST_DIST].curve = _createDistortionCurve(0);

  // pan.
  nodes[names.DIST_GAIN].connect(nodes[names.PAN_PAN]);
  nodes[names.PAN_PAN].pan.value = 0;

  // click track
  nodes[names.CLICK_GAIN].gain.value = 1;
  nodes[names.CLICK_GAIN].connect(ctx.destination);

  // finally, the analyser, filter and master output
  nodes[names.PAN_PAN].connect(nodes[names.FILTER]);
  nodes[names.FILTER].connect(nodes[names.MASTER]);
  nodes[names.FILTER].type = 'highpass';
  nodes[names.FILTER].frequency.value = 10;
  nodes[names.MASTER].connect(ctx.destination);
  //nodes[names.MASTER].connect(nodes[names.ANALYSER]);
  //nodes[names.ANALYSER].fftSize = 128;

};

const _createReverbBuffer = () => {
  const binary = atob(impulse_response);
  const len = binary.length;
  let bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++)
    bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

const _createDistortionCurve = k => {
  const numSamples = 44100;
  let curve = new Float32Array(numSamples);
  const deg = Math.PI / 180;
  let x = 0;
  for (let i = 0; i < numSamples; ++i) {
    x = i*2 / numSamples - 1;
    curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x) );
  }
  return curve;
};

const _createPulseCurve = width => {
  let curve = new Float32Array(100);
  curve.fill(1);
  for (let i = 0; i < width; i++)
    curve[i] = -1;
  return curve;
}

const _setToPulse = oscName => {
  if (nodes[oscName].pulse) return;

  const gainName = oscName === names.OSC_1 ? names.OSC_1_GAIN :
    oscName === names.OSC_2 ? names.OSC_2_GAIN : names.OSC_3_GAIN;
  const pulseName = oscName === names.OSC_1 ? names.PULSE_SHAPER_1 : 
    oscName === names.OSC_2 ? names.PULSE_SHAPER_2 : names.PULSE_SHAPER_3;

  nodes[oscName].type = 'sawtooth';
  nodes[oscName].pulse = true;
  nodes[oscName].disconnect(nodes[gainName]);
  nodes[oscName].connect(nodes[pulseName]);
  nodes[pulseName].connect(nodes[gainName]);
}
const _setFromPulse = (oscName) => {
  if (!nodes[oscName].pulse) return;

  const gainName = oscName === names.OSC_1 ? names.OSC_1_GAIN :
    oscName === names.OSC_2 ? names.OSC_2_GAIN : names.OSC_3_GAIN;
  const pulseName = oscName === names.OSC_1 ? names.PULSE_SHAPER_1 : 
    oscName === names.OSC_2 ? names.PULSE_SHAPER_2 : names.PULSE_SHAPER_3;

  nodes[oscName].pulse = false;
  nodes[oscName].disconnect(nodes[pulseName]);
  nodes[pulseName].disconnect(nodes[gainName]);
  nodes[oscName].connect(nodes[gainName]);
}

const setNote = (note, startTime) => {
  startTime = startTime || ctx.currentTime;
  const endGlide = glide;
  if (note) {
    currentNote = note;
    nodes[names.OSC_1].frequency.cancelScheduledValues(startTime);
    nodes[names.OSC_2].frequency.cancelScheduledValues(startTime);
    nodes[names.OSC_3].frequency.cancelScheduledValues(startTime);
    nodes[names.OSC_1].frequency.setTargetAtTime(getSemitoneFrequency(note, semitones[names.OSC_1]), startTime, endGlide);
    nodes[names.OSC_2].frequency.setTargetAtTime(getSemitoneFrequency(note, semitones[names.OSC_2]), startTime, endGlide);
    nodes[names.OSC_3].frequency.setTargetAtTime(getSemitoneFrequency(note, semitones[names.OSC_3]), startTime, endGlide);
  }
};
const start = time => {
  const currentTime = time || ctx.currentTime;
  nodes[names.ENV_GAIN].gain.cancelScheduledValues(currentTime);
  nodes[names.FILTER].frequency.cancelScheduledValues(currentTime);
  nodes[names.FILTER].frequency.setValueAtTime(filterEnv.initial, currentTime);
  nodes[names.FILTER].frequency.setTargetAtTime(filterEnv.target, currentTime, filterEnv.time);
  nodes[names.ENV_GAIN].gain.linearRampToValueAtTime(1, currentTime + (envelope.attack || 0.002));
  nodes[names.ENV_GAIN].gain.setTargetAtTime(envelope.sustain, currentTime + (envelope.attack || 0.002), envelope.decay || 0.002);
};
const stop = time => {
  const currentTime = time || ctx.currentTime;
  nodes[names.ENV_GAIN].gain.cancelAndHoldAtTime(currentTime);
  nodes[names.ENV_GAIN].gain.setTargetAtTime(0, currentTime, envelope.release || 0.002);
};

const needsValue = ['frequency', 'gain', 'delayTime', 'detune', 'Q', 'pan'];
const getValue = (nodeName, property) => {
  if (!nodes[nodeName]) {
    console.log('node not found');
    return undefined;
  } /*else if (_.isEmpty(nodes[nodeName][property])) {
    //console.log('node has no poperty', nodeName, property);
    return undefined;
  }*/ else if (needsValue.indexOf(property) === -1) {
    return nodes[nodeName][property];
  } else {
    return nodes[nodeName][property].value;
  }
};

const setValue = (nodeName, property, value) => {
  //console.log('set', nodeName, property, value);
  if (nodeName === names.ENV_GAIN) {
    envelope[property] = value;
    return;
  }
  if (property === 'glide') {
    glide = value;
    return;
  }
  // pulse wave type is handled differently
  if (property === 'type' && value === 'pulse') {
    return _setToPulse(nodeName);
  }
  if (property === 'type' && value !== 'pulse' && nodes[nodeName].pulse) {
    _setFromPulse(nodeName);
  }

  if (nodeName === names.FILTER) {
    if (property === 'time') return filterEnv.time = value;
    if (property === 'target') return filterEnv.target = value;
    if (property === 'frequency') return filterEnv.initial = value;
  }

  if (property === 'semitone') {
    semitones[nodeName] = value;
    property = 'frequency';
    value = getSemitoneFrequency(currentNote, value);
  } else if (property === 'distortionCurve') {
    property = 'curve';
    value = _createDistortionCurve(value);
  } else if (property === 'pulseWidth') {
    property = 'curve';
    value = _createPulseCurve(value);
  }
  if (needsValue.indexOf(property) === -1) {
    nodes[nodeName][property] = value;
  } else {
    nodes[nodeName][property].setValueAtTime(value, ctx.currentTime);
  }
};

const getCurrentTime = () => ctx.currentTime;

const startClicking = ({ bpm, beats }) => {
  const clickInterval = 60.0 / bpm;
  const now = ctx.currentTime;
  for (let i = 0; i < beats; i++) {
    const clickNode = ctx.createBufferSource();
    clickNode.buffer = clickBuffer;
    clickNode.connect(nodes[names.CLICK_GAIN]);
    clickNode.start(now + (i * clickInterval));
  }

}
const stopClicking = () => {
  nodes[names.CLICK_GAIN].disconnect();
  const oldGain = nodes[names.CLICK_GAIN].gain.value;
  nodes[names.CLICK_GAIN] = ctx.createGain();
  nodes[names.CLICK_GAIN].gain.value = oldGain;
  nodes[names.CLICK_GAIN].connect(ctx.destination);
}

const getTimeAnalysisData = buffer => {
  nodes[names.ANALYSER].getByteTimeDomainData(buffer);
}
const getFreqAnalysisData = buffer => {
  nodes[names.ANALYSER].getFloatFrequencyData(buffer);
}

exports.initSynth = initSynth;
exports.initKeyboard = initKeyboard;
exports.setNote = setNote;
exports.start = start;
exports.stop = stop;
exports.getValue = getValue;
exports.setValue = setValue;
exports.startClicking = startClicking;
exports.stopClicking = stopClicking;
exports.getCurrentTime = getCurrentTime;
exports.getTimeAnalysisData = getTimeAnalysisData;
exports.getFreqAnalysisData = getFreqAnalysisData;
