export const name = 'chords';
export const values = {
  oscs: [
    { type: 'sine', detune: 0, semitone: 0, gain: 0.35, pulseWidth: 25 },
    { type: 'sine', detune: 0, semitone: 4, gain: 0.38, pulseWidth: 25 },
    { type: 'sine', detune: 0, semitone: -5, gain: 0.40, pulseWidth: 25 },
  ],
  lfos: [
    { type: 'sine', frequency: 1, amplitude: 0 },
    { type: 'sine', frequency: 1, amplitude: 0 },
    { type: 'sine', frequency: 1, amplitude: 0 },
  ],
  filter: { type: 'lowpass', frequency: 7500, Q: 1, target: 7500, time: 0 },
  arpeggiator: { on: false, direction: 'up', time: 0.1, octave: 0 },
  envelope: { attack: 0, decay: 0.27, sustain: 0.29, release: 0 },
  glide: { glide: 0.35 },
  noise: { gain: 0 },
  master: { gain: 1 },
  chorus: { delay: 4, depth: 5, speed: 0.06 },
  delay: { delay: 0, gain: 0 },
  distortion: { k: 0, gain: 1 },
  reverb: { wet: 0.24, dry: 1 },
  pan: { pan: 0 },
};
