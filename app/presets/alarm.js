export const name = 'alarm';
export const values = {
  oscs: [
    { type: 'square', detune: 0, semitone: 0, gain: 0.50, pulseWidth: 25 },
    { type: 'triangle', detune: 0, semitone: 12, gain: 0.52, pulseWidth: 25 },
    { type: 'triangle', detune: -27, semitone: 13, gain: 0.46, pulseWidth: 25 },
  ],
  lfos: [
    { type: 'sine', frequency: 1, amplitude: 0 },
    { type: 'square', frequency: 5.05, amplitude: 1 },
    { type: 'sine', frequency: 1, amplitude: 0 },
  ],
  filter: { type: 'notch', frequency: 6060, Q: 0.648, target: 6060, time: 0 },
  arpeggiator: { on: false, direction: 'up', time: 0.1, octave: 0 },
  envelope: { attack: 0, decay: 0, sustain: 1, release: 0 },
  glide: { glide: 0 },
  noise: { gain: 0.12 },
  master: { gain: 1 },
  chorus: { delay: 0, depth: 0, speed: 0 },
  delay: { delay: 0, gain: 0 },
  distortion: { k: 0, gain: 1 },
  reverb: { wet: 0, dry: 1 },
  pan: { pan: 0 },
};
