export const name = 'xtina';
export const values = {
	oscs: [
		{ type: 'sine', detune: 0, semitone: -12, gain: 0.56, pulseWidth: 25 },
		{ type: 'pulse', detune: 0, semitone: 0, gain: 0.42, pulseWidth: 11 },
		{ type: 'triangle', detune: 15, semitone: 19, gain: 0.45, pulseWidth: 25 },
	],
	lfos: [
		{ type: 'sine', frequency: 1, amplitude: 0 },
		{ type: 'sine', frequency: 1, amplitude: 0 },
		{ type: 'sine', frequency: 1, amplitude: 0 },
	],
	filter: { type: 'lowpass', frequency: 13560, Q: 1, target: 1510, time: 0.70 },
	arpeggiator: { on: true, direction: 'up', time: 0.066, octave: 2 },
	envelope: { attack: 0, decay: 0.09, sustain: 0.83, release: 0 },
	glide: { glide: 0 },
	noise: { gain: 0.05 },
	master: { gain: 1 },
	chorus: { delay: 32, depth: 74, speed: 0.4 },
	delay: { delay: 0.18, gain: 0.25 },
	distortion: { k: 0, gain: 1 },
	reverb: { wet: 1, dry: 0.68 },
	pan: { pan: 0 },
};
