export const name = 'static';
export const values = {
  oscs: [
    { type: 'sine', detune: 0, semitone: 0, gain: 0.5, pulseWidth: 25 },
    { type: 'sawtooth', detune: 17, semitone: 0, gain: 0.32, pulseWidth: 25 },
    { type: 'triangle', detune: -7, semitone: 0, gain: 0.3, pulseWidth: 25 },
  ],
  lfos: [
    { type: 'sine', frequency: 1, amplitude: 0 },
    { type: 'sine', frequency: 1, amplitude: 0 },
    { type: 'sine', frequency: 1, amplitude: 0 },
  ],
  filter: { type: 'bandpass', frequency: 10, Q: 1, target: 4980, time: 0 },
  arpeggiator: { on: false, direction: 'up', time: 0.1, octave: 0 },
  envelope: { attack: 0.4, decay: 0, sustain: 1, release: 0.28 },
  glide: { glide: 0 },
  noise: { gain: 0.10 },
  master: { gain: 1 },
  chorus: { delay: 41, depth: 53, speed: 2.3 },
  delay: { delay: 0, gain: 0 },
  distortion: { k: 8, gain: 1 },
  reverb: { wet: 0.17, dry: 1 },
  pan: { pan: 0 },
};
