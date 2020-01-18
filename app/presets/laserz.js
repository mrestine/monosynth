export const name = 'laserz';
export const values = {
  oscs: [
    { type: 'sine', detune: 0, semitone: 0, gain: 0.8, pulseWidth: 25 },
    { type: 'pulse', detune: 0, semitone: 0, gain: 0.4, pulseWidth: 15 },
    { type: 'pulse', detune: 0, semitone: 12, gain: 0.37, pulseWidth: 22 },
  ],
  lfos: [
    { type: 'sine', frequency: 10, amplitude: 8.02 },
    { type: 'sine', frequency: 1, amplitude: 0 },
    { type: 'sine', frequency: 1, amplitude: 0 },
  ],
  filter: { type: 'highpass', frequency: 6820, Q: 1, target: 6820, time: 0 },
  arpeggiator: { on: false, direction: 'up', time: 0.1, octave: 0 },
  envelope: { attack: 0, decay: 0, sustain: 1, release: 0 },
  glide: { glide: 0 },
  noise: { gain: 0.01 },
  master: { gain: 1 },
  chorus: { delay: 13, depth: 57, speed: 7.1 },
  delay: { delay: 0, gain: 0 },
  distortion: { k: 55, gain: 1.00 },
  reverb: { wet: 0, dry: 1 },
  pan: { pan: 0 },
};
