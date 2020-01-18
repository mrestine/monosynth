export const name = 'ufo';
export const values = {
  oscs: [
    { type: 'pulse', detune: -4, semitone: 0, gain: 0.4, pulseWidth: 17 },
    { type: 'pulse', detune: -14, semitone: 3, gain: 0.22, pulseWidth: 81 },
    { type: 'pulse', detune: 22, semitone: 7, gain: 0.27, pulseWidth: 15 },
  ],
  lfos: [
    { type: 'sine', frequency: 10, amplitude: 10 },
    { type: 'sine', frequency: 1, amplitude: 0 },
    { type: 'sine', frequency: 0.80, amplitude: 1305.36 },
  ],
  filter: { type: 'bandpass', frequency: 10, Q: 1, target: 2270, time: 0.29 },
  arpeggiator: { on: false, direction: 'up', time: 0.1, octave: 0 },
  envelope: { attack: 0, decay: 0, sustain: 1, release: 0 },
  glide: { glide: 0.21 },
  noise: { gain: 0.16 },
  master: { gain: 1 },
  chorus: { delay: 8, depth: 0, speed: 10 },
  delay: { delay: 0, gain: 0 },
  distortion: { k: 27, gain: 1 },
  reverb: { wet: 1, dry: 0 },
  pan: { pan: 0 },
};
