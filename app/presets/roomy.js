export const name = 'roomy';
export const values = {
  oscs: [
    { type: 'sawtooth', detune: 10, semitone: 0, gain: 0.5, pulseWidth: 25 },
    { type: 'sine', detune: -8, semitone: 12, gain: 0.43, pulseWidth: 25 },
    { type: 'pulse', detune: 9, semitone: -12, gain: 0.09, pulseWidth: 14 },
  ],
  lfos: [
    { type: 'sine', frequency: 3.04, amplitude: 0.55 },
    { type: 'sine', frequency: 1, amplitude: 0.26 },
    { type: 'sine', frequency: 0.41, amplitude: 168.34 },
  ],
  filter: { type: 'bandpass', frequency: 14470, Q: 0.322, target: 1230, time: 0.13 },
  arpeggiator: { on: false, direction: 'up', time: 0.1, octave: 0 },
  envelope: { attack: 0.12, decay: 0, sustain: 1, release: 0.31 },
  glide: { glide: 0 },
  noise: { gain: 0.04 },
  master: { gain: 1 },
  chorus: { delay: 33, depth: 17, speed: 1.2 },
  delay: { delay: 0.28, gain: 0.25 },
  distortion: { k: 0, gain: 1 },
  reverb: { wet: 1, dry: 0.8 },
  pan: { pan: 0 },
};
