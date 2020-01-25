import _ from 'lodash';
import { setNote, start, stop, getCurrentTime } from './audioContext';
import { clearKeys } from './keyboard';
import notes from './notes';

let on = false,
    time = 100,
    direction = 'up',
    octave = 0,
    i = 0,
    sourceNotes = [],
    arpeggio = [],
    nextNoteTime = null,
    arpInterval = null;

const createArpeggio = newArpeggio => {
    if (!newArpeggio || !newArpeggio.length) return;
    sourceNotes = newArpeggio;

    if (octave > 0) {
        // clone the array, iterate note octave, once per octave
        let higherOctave = [];
        for (let o = 0; o < octave; o++) {
            let clonedArp = _.clone(newArpeggio);
            clonedArp = clonedArp.map(n => {
                let newOct = Number(n.substr(-1)) + o + 1;
                return n.substr(0, n.length - 1) + newOct;
            });
            higherOctave = higherOctave.concat(clonedArp);
        }
        // slot the higherOctave(s) into newArpeggio, deduped
        newArpeggio = _.uniq(newArpeggio.concat(higherOctave));
    }
    // always sort the new arpeggio
    newArpeggio = _.sortBy(newArpeggio, n => notes[n]);

    if (direction === 'up')
        arpeggio = newArpeggio;
    else if (direction === 'down')
        arpeggio = newArpeggio.reverse();
    else if (direction === 'excl') {
        if (newArpeggio.length <= 2)
            arpeggio = newArpeggio;
        else
            arpeggio = newArpeggio.concat(newArpeggio.slice(1, -1).reverse());
    } else if (direction === 'incl') {
        if (newArpeggio.length <= 1)
            arpeggio = newArpeggio;
        else
            arpeggio = newArpeggio.concat(newArpeggio.slice(0).reverse());
    } else {
        arpeggio = newArpeggio;
    }
};

const startArpeggio = () => {
    if (arpeggio.length === 0) return;
    nextNoteTime = getCurrentTime();
    arpInterval = setInterval(_arpeggiate, time);
};

const stopArpeggio = () => {
    clearInterval(arpInterval);
};

const _arpeggiate = () => {
    const now = getCurrentTime();
    const noteStart = nextNoteTime > now ? nextNoteTime : now;

    if (arpeggio.length === 0) return;
    if (direction == 'rand') {
        let randNote = arpeggio[Math.floor(Math.random() * arpeggio.length)];
        setNote(randNote, noteStart);
    } else {
        setNote(arpeggio[i], noteStart);
        i++;
        if (i >= arpeggio.length) i = 0;
    }
    start(noteStart);
    stop(noteStart + (time / 1000) - 0.01);
    nextNoteTime = noteStart + time/1000;
};

const setArpeggiator = (newSettings) => {
    //const { on, time, direction, octave } = newSettings;
    let newArpeggioNeeded = false;
    if (typeof newSettings.on !== 'undefined' && newSettings.on !== on) {
        if (!newSettings.on) {
            stopArpeggio();
            arpeggio = [];
            clearKeys();
        } else {
            startArpeggio();
            newArpeggioNeeded = true;
        }
        on = newSettings.on;
    }
    if (typeof newSettings.time !== 'undefined' && newSettings.time != time) {
        if (on) {
            stopArpeggio();
            startArpeggio();
        }
        time = newSettings.time;
    }
    if (typeof newSettings.direction !== 'undefined' && direction !== newSettings.direction) {
        direction = newSettings.direction;
        newArpeggioNeeded = true;
    }
    if (typeof newSettings.octave !== 'undefined' && octave !== newSettings.octave) {
        octave = newSettings.octave;
        newArpeggioNeeded = true;
    }
    if (newArpeggioNeeded) createArpeggio(sourceNotes);
};


exports.isArpeggiating = () => on;
exports.createArpeggio = createArpeggio;
exports.startArpeggio = startArpeggio;
exports.stopArpeggio = stopArpeggio;
exports.setArpeggiator = setArpeggiator;
