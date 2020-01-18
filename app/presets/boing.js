export const name = 'boing';
export const values = {
  oscs: [
    { type: 'triangle', detune: -8, semitone: 0, gain: 0.53, pulseWidth: 25 },
    { type: 'square', detune: 6, semitone: 0, gain: 0.48, pulseWidth: 25 },
    { type: 'sine', detune: 15, semitone: 1, gain: 0.41, pulseWidth: 25 },
  ],
  lfos: [
    { type: 'sine', frequency: 8, amplitude: 10 },
    { type: 'sine', frequency: 4, amplitude: 0.2 },
    { type: 'sine', frequency: 1, amplitude: 0 },
  ],
  filter: { type: 'highpass', frequency: 10, Q: 1, target: 10, time: 0 },
  arpeggiator: { on: false, direction: 'up', time: 0.1, octave: 0 },
  envelope: { attack: 0, decay: 0.20, sustain: 0, release: 0 },
  glide: { glide: 0 },
  noise: { gain: 0 },
  master: { gain: 1 },
  chorus: { delay: 7, depth: 100, speed: 10 },
  delay: { delay: 0.07, gain: 0.49 },
  distortion: { k: 0, gain: 1 },
  reverb: { wet: 0.45, dry: 1 },
  pan: { pan: 0 },
};
