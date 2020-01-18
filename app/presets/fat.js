export const name = 'fat';
export const values = {
  oscs: [
    { type: 'sine', detune: 0, semitone: -12, gain: 0.4, pulseWidth: 25 },
    { type: 'square', detune: 2, semitone: 0, gain: 0.5, pulseWidth: 25 },
    { type: 'triangle', detune: 1, semitone: 7, gain: 0.2, pulseWidth: 25 },
  ],
  lfos: [
    { type: 'sine', frequency: 0.5, amplitude: 0.5 },
    { type: 'sine', frequency: 0.6, amplitude: 0.2 },
    { type: 'sine', frequency: 0.24, amplitude: 1750 },
  ],
  filter: { type: 'lowpass', frequency: 3680, Q: 1, target: 3680, time: 0 },
  arpeggiator: { on: false, direction: 'up', time: 0.1, octave: 0 },
  envelope: { attack: 0.01, decay: 0.02, sustain: 0.4, release: 0.4 },
  glide: { glide: 0, },
  noise: { gain: 0.25 },
  master: { gain: 0.9 },
  chorus: { delay: 50, depth: 50, speed: 1 },
  delay: { delay: 0.5, gain: 0.25 },
  distortion: { k: 87, gain: 1 },
  reverb: { wet: 0.5, dry: 0.8 },
  pan: { pan: 0 },
};
