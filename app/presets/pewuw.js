export const name = 'pewuw';
export const values = {
  oscs: [
    { type: 'sine', detune: 0, semitone: -12, gain: 0.5, pulseWidth: 25 },
    { type: 'square', detune: 7, semitone: 0, gain: 0.38, pulseWidth: 25 },
    { type: 'sawtooth', detune: 0, semitone: 7, gain: 0.25, pulseWidth: 25 },
  ],
  lfos: [
    { type: 'sine', frequency: 1, amplitude: 0 },
    { type: 'sine', frequency: 1, amplitude: 0 },
    { type: 'sine', frequency: 1, amplitude: 75.66 },
  ],
  filter: { type: 'lowpass', frequency: 12530, Q: 1, target: 170, time: 1.36 },
  arpeggiator: { on: false, direction: 'up', time: 0.1, octave: 0 },
  envelope: { attack: 0, decay: 0, sustain: 1, release: 0 },
  glide: { glide: 0 },
  noise: { gain: 0.22 },
  master: { gain: 1 },
  chorus: { delay: 0.23, depth: 0.48, speed: 0.8 },
  delay: { delay: 0.09, gain: 0.3 },
  distortion: { k: 35, gain: 1 },
  reverb: { wet: 0.61, dry: 0.9 },
  pan: { pan: 0 },
};