export const name = 'classic';
export const values = {
  oscs: [
    { type: 'pulse', detune: 0, semitone: 0, gain: 0.5, pulseWidth: 25 },
    { type: 'square', detune: 0, semitone: 12, gain: 0.17, pulseWidth: 25 },
    { type: 'triangle', detune: 0, semitone: -12, gain: 0.4, pulseWidth: 25 },
  ],
  lfos: [
    { type: 'sine', frequency: 7.86, amplitude: 1.12 },
    { type: 'sine', frequency: 1, amplitude: 0 },
    { type: 'sine', frequency: 1, amplitude: 0 },
  ],
  filter: { type: 'highpass', frequency: 3170, Q: 1, target: 10, time: 0.31 },
  arpeggiator: { on: false, direction: 'up', time: 0.1, octave: 0 },
  envelope: { attack: 0, decay: 0, sustain: 1, release: 0 },
  glide: { glide: 0 },
  noise: { gain: 0 },
  master: { gain: 1 },
  chorus: { delay: 0, depth: 0, speed: 0 },
  delay: { delay: 0, gain: 0 },
  distortion: { k: 48, gain: 1 },
  reverb: { wet: 0, dry: 1 },
  pan: { pan: 0 },
};