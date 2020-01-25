import { setNote, start, stop } from './audioContext';
import { recordEvent, isLive } from './recording';
import { isArpeggiating, createArpeggio, startArpeggio, stopArpeggio } from './arpeggiator';

const notes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
let device = null,
    lastPressed = [],
    keysDown = [];

const init = (connected, disconnected) => {
    if (device && device.state && device.state.state === 'connected') return;

    navigator.requestMIDIAccess().then(access => {
        if (access.inputs && access.inputs.size > 0) {
            var inputs = access.inputs.values(),
                input = null;
            for (input = inputs.next(); input && !input.done; input = inputs.next()) {
                device = input.value;
                device.onmidimessage = onMidi;
                device.onstatechange = () => {
                    if (device.state === 'connected') connected();
                    else disconnected();
                }
            }
            connected();
        } else {
            disconnected();
        }
    }, disconnected);
};

const disconnectMidi = cb => {
    if (device && device.close && typeof device.close === 'function') {
        device.close();
    }
    if (typeof cb === 'function') cb();
};

const onMidi = message => {
    const key = message.data[1];
    const ev = { timeStamp: window.performance.now(), key, midi: true };
    switch (message.data[0]) {
        case 144:
            if (message.data[2] === 0) { // velocity 0 is keyup for some keyboards, apparently.
                if (isLive()) recordEvent('up', ev);
                handleKeyUp(key);
            } else {
                if (isLive()) recordEvent('down', ev);
                handleKeyDown(key);
            }
            break;
        case 128:
            if (isLive()) recordEvent('up', ev);
            handleKeyUp(key);
            break;
    }
}

const _getNoteFromKey = key => {
    return notes[key % 12] + Math.floor(key/12);
}
const _createArpeggio = () => createArpeggio(keysDown.map(_getNoteFromKey));

const handleKeyDown = key => {
    const note = _getNoteFromKey(key);
    if (keysDown.indexOf(key) === -1) {
        keysDown.push(key);
        lastPressed = key;
        if (!isArpeggiating()) {
            setNote(note);
            if (keysDown.length === 1) start();
        } else {
            _createArpeggio();
            if (keysDown.length === 1) startArpeggio();
        }
    }
};
const handleKeyUp = key => {
    const note = _getNoteFromKey(key);
    if (keysDown.indexOf(key) !== -1) {
        keysDown.splice( keysDown.indexOf(key), 1 );
        if (keysDown.length === 0) {
            stop();
            if (isArpeggiating) stopArpeggio();
        }
        if (isArpeggiating())
            _createArpeggio();
        else if (key === lastPressed && keysDown.length > 0) {
            lastPressed = keysDown[keysDown.length - 1];
            setNote(_getNoteFromKey(lastPressed));
        }
    }
};

const failure = () => {
    alert('Could not access MIDI device');
}

exports.initializeMidi = init;
exports.disconnectMidi = disconnectMidi;
exports.handleMidiKeyDown = handleKeyDown;
exports.handleMidiKeyUp = handleKeyUp;
