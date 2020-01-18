import _ from 'lodash';
import { setNote, start, stop, getCurrentTime, startClicking, stopClicking } from './audioContext';
import { isArpeggiating, createArpeggio, startArpeggio, stopArpeggio } from './arpeggiator';
import * as recording from './recording';
let sendKeysChange = () => {};

const maxOctave = 6;
const minOctave = 1;
const noteKeys = 'zsxdcvgbhnjm,l.;/';
const octaveUpNotes = ',l.;/';
const noteMap = {
  z: 'C',
  s: 'Db',
  x: 'D',
  d: 'Eb',
  c: 'E',
  v: 'F',
  g: 'Gb',
  b: 'G',
  h: 'Ab',
  n: 'A',
  j: 'Bb',
  m: 'B',
  ',': 'C',
  'l': 'Db',
  '.': 'D',
  ';': 'Eb',
  '/': 'E',
};

let keysDown = [];
let currentOctave = 4;
let lastPressed = '';

const _getNoteFromKey = key => noteMap[key] + ( octaveUpNotes.indexOf(key) === -1 ? currentOctave : (currentOctave+1) );

const _keyDown = (ev) => {
  if (ev.key === 'r') {
    if (recording.isLive()) recording.stopRecording(true);
    else recording.startRecording();
    return;
  }
  if (ev.key === 'p') {
    if (recording.isLive()) recording.stopRecording(true);
    else if (recording.isPlaying()) recording.stopPlayback();
    else recording.startPlayback();
    return;
  }
  if (ev.key === 'e') {
    if (recording.isLive()) recording.stopRecording(true);
    if (recording.isPlaying()) recording.stopPlayback();
    recording.clearRecording();
    return;
  }
  if (recording.isLive()) recording.recordEvent('down', ev);

  if (ev.code === 'ShiftLeft' && currentOctave > minOctave) {
    currentOctave--;
    if (isArpeggiating()) _createArpeggio();
    else setNote(_getNoteFromKey(lastPressed));
  } else if (ev.code === 'ShiftRight' && currentOctave < maxOctave) {
    currentOctave++;
    if (isArpeggiating()) _createArpeggio();
    else setNote(_getNoteFromKey(lastPressed));
  } else if (noteKeys.indexOf(ev.key) !== -1 && keysDown.indexOf(ev.key) === -1) {
    const note = _getNoteFromKey(ev.key);
    keysDown.push(ev.key);
    sendKeysChange(keysDown);
    lastPressed = ev.key;
    if (!isArpeggiating()) {
      setNote(note);
      if (keysDown.length === 1)
        start();
    } else {
      _createArpeggio();
      if (keysDown.length === 1)
        startArpeggio();
    }
  }
};

const _keyUp = (ev) => {
  if (recording.isLive()) recording.recordEvent('up', ev);

  if (noteKeys.indexOf(ev.key) !== -1 && keysDown.indexOf(ev.key) !== -1) {
    keysDown.splice( keysDown.indexOf(ev.key), 1 );
    sendKeysChange(keysDown);
    if (keysDown.length === 0) {
      stop();
      if (isArpeggiating())
         stopArpeggio();
    }
    if (isArpeggiating())
      _createArpeggio();
    else if (ev.key === lastPressed && keysDown.length > 0) {
      lastPressed = keysDown[keysDown.length - 1];
      setNote(_getNoteFromKey(lastPressed));
    }
  }
};

const _createArpeggio = () => createArpeggio(keysDown.map(_getNoteFromKey));

const initKeyboard = keysChangeCallback => {
  sendKeysChange = keysChangeCallback;
  document.onkeydown = _keyDown;
  document.onkeyup = _keyUp;
};

const clearKeys = () => {
  keysDown = [];
  if (isArpeggiating())
    _createArpeggio();
  sendKeysChange(keysDown);
  stop();
}


exports.initKeyboard = initKeyboard;
exports.handleKeyDown = _keyDown;
exports.handleKeyUp = _keyUp;
exports.clearKeys = clearKeys;
