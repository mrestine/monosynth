export const name = 'pulsarp';
export const values = {
  oscs: [
    { type: 'pulse', detune: 0, semitone: 0, gain: 0.5, pulseWidth: 15 },
    { type: 'pulse', detune: 0, semitone: -12, gain: 0.16, pulseWidth: 30 },
    { type: 'pulse', detune: 14, semitone: 0, gain: 0.24, pulseWidth: 92 },
  ],
  lfos: [
    { type: 'sine', frequency: 1, amplitude: 0 },
    { type: 'sine', frequency: 1, amplitude: 0 },
    { type: 'sine', frequency: 1, amplitude: 0 },
  ],
  filter: { type: 'highpass', frequency: 10, Q: 1, target: 10, time: 0 },
  arpeggiator: { on: true, direction: 'down', time: 0.19, octave: 1 },
  envelope: { attack: 0, decay: 0.07, sustain: 0.31, release: 0 },
  glide: { glide: 0 },
  noise: { gain: 0 },
  master: { gain: 1 },
  chorus: { delay: 0, depth: 0, speed: 0 },
  delay: { delay: 0.19, gain: 0.6 },
  distortion: { k: 0, gain: 1 },
  reverb: { wet: 0, dry: 1 },
  pan: { pan: 0 },
};
