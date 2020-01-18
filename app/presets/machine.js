export const name = 'machine';
export const values = {
  oscs: [
    { type: 'square', detune: 0, semitone: 0, gain: 0.47, pulseWidth: 25 },
    { type: 'square', detune: 0, semitone: -9, gain: 0.4, pulseWidth: 25 },
    { type: 'square', detune: 0, semitone: 7, gain: 0.31, pulseWidth: 25 },
  ],
  lfos: [
    { type: 'sine', frequency: 1, amplitude: 0 },
    { type: 'sine', frequency: 1, amplitude: 0 },
    { type: 'sine', frequency: 0.78, amplitude: 5000 },
  ],
  filter: { type: 'notch', frequency: 10, Q: 0.414, target: 8070, time: 0 },
  arpeggiator: { on: true, direction: 'rand', time: 0.076, octave: 2 },
  envelope: { attack: 0, decay: 0, sustain: 1, release: 0 },
  glide: { glide: 0 },
  noise: { gain: 0.09 },
  master: { gain: 1 },
  chorus: { delay: 10, depth: 80, speed: 10 },
  delay: { delay: 0.17, gain: 0.40 },
  distortion: { k: 0, gain: 1 },
  reverb: { wet: 0, dry: 1 },
  pan: { pan: 0 },
};
