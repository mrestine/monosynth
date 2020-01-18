export const name = 'buzzsaw';
export const values = {
  oscs: [
    { type: 'sawtooth', detune: -9, semitone: 0, gain: 0.5, pulseWidth: 25 },
    { type: 'sawtooth', detune: 10, semitone: 0, gain: 0.5, pulseWidth: 25 },
    { type: 'sawtooth', detune: 0, semitone: 7, gain: 0.15, pulseWidth: 25 },
  ],
  lfos: [
    { type: 'sine', frequency: 3.34, amplitude: 2.80 },
    { type: 'sine', frequency: 1, amplitude: 0 },
    { type: 'sine', frequency: 8.64, amplitude: 1398 },
  ],
  filter: { type: 'highpass', frequency: 3680, Q: 1, target: 3680, time: 0 },
  arpeggiator: { on: false, direction: 'up', time: 0.1, octave: 0 },
  envelope: { attack: 0, decay: 0.06, sustain: 0.57, release: 0 },
  glide: { glide: 0.10 },
  noise: { gain: 0.37 },
  master: { gain: 1 },
  chorus: { delay: 41, depth: 46, speed: 0.9 },
  delay: { delay: 0.21, gain: 0.45 },
  distortion: { k: 26, gain: 0.46 },
  reverb: { wet: 0.33, dry: 1 },
  pan: { pan: 0 },
};
