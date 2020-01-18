export const name = 'explod';
export const values = {
  oscs: [
    { type: 'sawtooth', detune: 1, semitone: -12, gain: 1, pulseWidth: 25 },
    { type: 'pulse', detune: 17, semitone: -12, gain: 1, pulseWidth: 26 },
    { type: 'square', detune: -16, semitone: -12, gain: 1, pulseWidth: 25 },
  ],
  lfos: [
    { type: 'sine', frequency: 1, amplitude: 0 },
    { type: 'sine', frequency: 1, amplitude: 0 },
    { type: 'sine', frequency: 1, amplitude: 0 },
  ],
  filter: { type: 'lowpass', frequency: 22050, Q: 1, target: 10, time: 0.59 },
  arpeggiator: { on: false, direction: 'up', time: 0.1, octave: 0 },
  envelope: { attack: 0, decay: 0.1, sustain: 0, release: 0 },
  glide: { glide: 0 },
  noise: { gain: 1 },
  master: { gain: 1 },
  chorus: { delay: 100, depth: 100, speed: 0 },
  delay: { delay: 0, gain: 0 },
  distortion: { k: 100, gain: 1 },
  reverb: { wet: 1, dry: 1 },
  pan: { pan: 0 },
};
