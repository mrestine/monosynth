export const name = 'tape';
export const values = {
  oscs: [
    { type: 'triangle', detune: 0, semitone: -12, gain: 0.5, pulseWidth: 25 },
    { type: 'sawtooth', detune: -11, semitone: -5, gain: 0.22, pulseWidth: 25 },
    { type: 'pulse', detune: 8, semitone: 0, gain: 0.24, pulseWidth: 13 },
  ],
  lfos: [
    { type: 'sine', frequency: 1.68, amplitude: 2.26 },
    { type: 'sine', frequency: 0.53, amplitude: 0.33 },
    { type: 'sine', frequency: 1.30, amplitude: 1949.17 },
  ],
  filter: { type: 'lowpass', frequency: 4040, Q: 1, target: 5310, time: 1.70 },
  arpeggiator: { on: false, direction: 'up', time: 0.1, octave: 0 },
  envelope: { attack: 0, decay: 0, sustain: 1, release: 0 },
  glide: { glide: 0.34 },
  noise: { gain: 0.08 },
  master: { gain: 1 },
  chorus: { delay: 0, depth: 0, speed: 0 },
  delay: { delay: 0.06, gain: 0.3 },
  distortion: { k: 4, gain: 0.65 },
  reverb: { wet: 0, dry: 1 },
  pan: { pan: 0 },
};
