export const name = 'arpthing';
export const values = {
  oscs: [
    { type: 'sine', detune: 0, semitone: -12, gain: 0.8, pulseWidth: 25 },
    { type: 'square', detune: -2, semitone: 0, gain: 0.6, pulseWidth: 25 },
    { type: 'sawtooth', detune: 8, semitone: 7, gain: 0.4, pulseWidth: 25 },
  ],
  lfos: [
    { type: 'sine', frequency: 0.5, amplitude: 0.5 },
    { type: 'sine', frequency: 0.6, amplitude: 0.2 },
    { type: 'sine', frequency: 0.05, amplitude: 1500 },
  ],
  filter: { type: 'lowpass', frequency: 2800, Q: 1, target: 2800, time: 0 },
  arpeggiator: { on: true, direction: 'excl', time: 0.263, octave: 0 },
  envelope: { attack: 0.01, decay: 0, sustain: 1, release: 0 },
  glide: { glide: 0.01, },
  noise: { gain: 0 },
  master: { gain: 1 },
  chorus: { delay: 71, depth: 77, speed: 1 },
  delay: { delay: 0.5, gain: 0.25 },
  distortion: { k: 40, gain: 1 },
  reverb: { wet: 0, dry: 1 },
  pan: { pan: 0 },
};
