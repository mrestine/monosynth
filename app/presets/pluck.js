export const name = 'pluck';
export const values = {
  oscs: [
    { type: 'triangle', detune: -8, semitone: 0, gain: 0.53, pulseWidth: 25 },
    { type: 'square', detune: 6, semitone: 0, gain: 0.48, pulseWidth: 25 },
    { type: 'sine', detune: 0, semitone: 0, gain: 0, pulseWidth: 25 },
  ],
  lfos: [
    { type: 'sine', frequency: 1, amplitude: 0 },
    { type: 'sine', frequency: 1, amplitude: 0 },
    { type: 'sine', frequency: 1, amplitude: 0 },
  ],
  filter: { type: 'highpass', frequency: 10, Q: 1, target: 10, time: 0 },
  arpeggiator: { on: false, direction: 'up', time: 0.1, octave: 0 },
  envelope: { attack: 0, decay: 0.07, sustain: 0, release: 0 },
  glide: { glide: 0 },
  noise: { gain: 0 },
  master: { gain: 1 },
  chorus: { delay: 0, depth: 0, speed: 0 },
  delay: { delay: 0.07, gain: 0.35 },
  distortion: { k: 0, gain: 1 },
  reverb: { wet: 0.22, dry: 0.98 },
  pan: { pan: 0 },
};
