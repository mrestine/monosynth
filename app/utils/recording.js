import { startClicking, stopClicking } from './audioContext';
import { handleKeyDown, handleKeyUp, clearKeys } from './keyboard';
import { handleMidiKeyDown, handleMidiKeyUp } from './midi';

let live = false,
    settings = { bpm: 120, beats: 8 },
    events = [],
    cursor,
    startTime,
    duration,
    endTimeout = null,
    playbackTimeout = false,
    sendStatusUpdate = () => {}

const recordEvent = (type, ev) => {
    events.push({ 
        type,
        timeStamp: ev.timeStamp - startTime, 
        ev: { key: ev.key, code: ev.code },
        midi: ev.midi,
    });
};

const clearRecording = () => {
    events = [];
    sendStatusUpdate('erased');
};

const startRecording = () => {
    sendStatusUpdate('recording');
    startClicking(settings);
    if (events.length > 0) clearRecording();
    live = true;
    startTime = window.performance.now();
    duration = 1000.0 * settings.beats * 60.0 / settings.bpm;
    endTimeout = setTimeout(stopRecording, duration);
};

const stopRecording = early => {
    stopClicking();
    live = false;
    if (early) {
        duration = window.performance.now() - startTime;
        clearTimeout(endTimeout);
    }
    startPlayback();
};

const startPlayback = () => {
    if (events.length === 0) return;
    sendStatusUpdate('playing');
    cursor = 0;
    startTime = window.performance.now();
    playbackTimeout = setTimeout(_triggerRecordedEvent, events[0].timeStamp);
};

const stopPlayback = () => {
    sendStatusUpdate('stopped');
    clearTimeout(playbackTimeout);
    playbackTimeout = null;
    clearKeys();
};

const _triggerRecordedEvent = () => {
    let currentEvent = events[cursor];
    if (!currentEvent) return;
    if (currentEvent.type === 'down') {
        if (currentEvent.midi) handleMidiKeyDown(currentEvent.ev.key);
        else handleKeyDown(currentEvent.ev);
    }
    else if (currentEvent.type === 'up') {
        if (currentEvent.midi) handleMidiKeyUp(currentEvent.ev.key);
        else handleKeyUp(currentEvent.ev);
    }
    else return;

    cursor++;
    let timeToNextEvent;
    let now = window.performance.now();
    if (cursor === events.length) {
        cursor = 0;
        const endTime = startTime + duration;
        const timeToEnd = endTime - now;//duration - currentEvent.timeStamp;
        timeToNextEvent = timeToEnd + events[cursor].timeStamp;
        startTime = endTime;
    } else {
        timeToNextEvent = startTime + events[cursor].timeStamp - now;
    }
    playbackTimeout = setTimeout(_triggerRecordedEvent, timeToNextEvent);
};

const isLive = () => live;
const isPlaying = () => !!playbackTimeout;

const registerStatusHandler = fn => sendStatusUpdate = fn;

const setClickSettings = newSettings => {
    if (!live)
        settings = { ...settings, ...newSettings };
    return !live;
};

exports.recordEvent = recordEvent;
exports.clearRecording = clearRecording;
exports.startRecording = startRecording;
exports.stopRecording = stopRecording;
exports.startPlayback = startPlayback;
exports.stopPlayback = stopPlayback;
exports.isLive = isLive;
exports.isPlaying = isPlaying;
exports.setClickSettings = setClickSettings;
exports.registerStatusHandler = registerStatusHandler;
