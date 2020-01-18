export const name = 'chowm';
export const values = {
  oscs: [
    { type: 'pulse', detune: 0, semitone: -12, gain: 0.42, pulseWidth: 19 },
    { type: 'pulse', detune: 0, semitone: 0, gain: 0.39, pulseWidth: 71 },
    { type: 'pulse', detune: 0, semitone: -5, gain: 0.63, pulseWidth: 16 },
  ],
  lfos: [
    { type: 'sine', frequency: 1, amplitude: 0 },
    { type: 'sine', frequency: 1, amplitude: 0 },
    { type: 'sine', frequency: 1, amplitude: 0 },
  ],
  filter: { type: 'highpass', frequency: 3680, Q: 1, target: 200, time: 0.12 },
  arpeggiator: { on: false, direction: 'up', time: 0.1, octave: 0 },
  envelope: { attack: 0, decay: 0.09, sustain: 0, release: 0 },
  glide: { glide: 0 },
  noise: { gain: 0.46 },
  master: { gain: 1 },
  chorus: { delay: 0, depth: 0, speed: 0 },
  delay: { delay: 0.05, gain: 0.3 },
  distortion: { k: 72, gain: 1 },
  reverb: { wet: 0.56, dry: 1 },
  pan: { pan: 0 },
};