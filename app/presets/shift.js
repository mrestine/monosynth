export const name = 'shift';
export const values = {
  oscs: [
    { type: 'sawtooth', detune: 0, semitone: -12, gain: 0.5, pulseWidth: 25 },
    { type: 'sine', detune: 0, semitone: 24, gain: 0.4, pulseWidth: 25 },
    { type: 'sawtooth', detune: 0, semitone: 7, gain: 0.46, pulseWidth: 25 },
  ],
  lfos: [
    { type: 'sine', frequency: 0.26, amplitude: 10 },
    { type: 'sine', frequency: 2.17, amplitude: 0.45 },
    { type: 'sine', frequency: 1, amplitude: 0 },
  ],
  filter: { type: 'lowpass', frequency: 10, Q: 1, target: 3140, time: 0 },
  arpeggiator: { on: false, direction: 'up', time: 0.1, octave: 0 },
  envelope: { attack: 0, decay: 0, sustain: 1, release: 0.62 },
  glide: { glide: 1 },
  noise: { gain: 0.06 },
  master: { gain: 1 },
  chorus: { delay: 100, depth: 100, speed: 0.5 },
  delay: { delay: 0.29, gain: 0.1 },
  distortion: { k: 48, gain: 1 },
  reverb: { wet: 1, dry: 0 },
  pan: { pan: 0 },
};
