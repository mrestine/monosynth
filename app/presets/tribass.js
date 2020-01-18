export const name = 'tribass';
export const values = {
  oscs: [
    { type: 'sine', detune: 0, semitone: -12, gain: 0.5, pulseWidth: 25 },
    { type: 'triangle', detune: 0, semitone: 0, gain: 0.28, pulseWidth: 25 },
    { type: 'sine', detune: 0, semitone: 12, gain: 0.12, pulseWidth: 25 },
  ],
  lfos: [
    { type: 'sine', frequency: 0.79, amplitude: 0.27 },
    { type: 'sine', frequency: 1, amplitude: 0 },
    { type: 'sine', frequency: 1, amplitude: 0 },
  ],
  filter: { type: 'notch', frequency: 2620, Q: 0.252, target: 2620, time: 0 },
  arpeggiator: { on: false, direction: 'up', time: 0.1, octave: 0 },
  envelope: { attack: 0.02, decay: 0, sustain: 1, release: 0 },
  glide: { glide: 0.03 },
  noise: { gain: 0 },
  master: { gain: 1 },
  chorus: { delay: 0, depth: 0, speed: 0 },
  delay: { delay: 0, gain: 0 },
  distortion: { k: 3, gain: 1 },
  reverb: { wet: 0.39, dry: 1 },
  pan: { pan: 0 },
};
