export const name = 'banjo';
export const values = {
  oscs: [
    { type: 'pulse', detune: 0, semitone: 0, gain: 0.43, pulseWidth: 34 },
    { type: 'pulse', detune: 0, semitone: 4, gain: 0.6, pulseWidth: 23 },
    { type: 'sine', detune: 0, semitone: -12, gain: 0.5, pulseWidth: 25 },
  ],
  lfos: [
    { type: 'sine', frequency: 1, amplitude: 0 },
    { type: 'sine', frequency: 1, amplitude: 0 },
    { type: 'sine', frequency: 1, amplitude: 0 },
  ],
  filter: { type: 'bandpass', frequency: 6930, Q: 1, target: 710, time: 0.19 },
  arpeggiator: { on: false, direction: 'up', time: 0.1, octave: 0 },
  envelope: { attack: 0, decay: 0.2, sustain: 0, release: 0 },
  glide: { glide: 0 },
  noise: { gain: 0 },
  master: { gain: 1 },
  chorus: { delay: 21, depth: 11, speed: 0.8 },
  delay: { delay: 0, gain: 0 },
  distortion: { k: 0, gain: 1 },
  reverb: { wet: 0, dry: 1 },
  pan: { pan: 0 },
};
