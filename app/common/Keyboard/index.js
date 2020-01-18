import './keyboard.scss';
import React, { Component } from 'react';
import FieldSet from '../FieldSet';
import MidiButton from '../MidiButton';
import { initKeyboard } from '../../utils/audioContext';

class Keyboard extends Component {

  constructor (props) {
    super();
    this.blackKeys = [
      { key: 's', left: '20px' },
      { key: 'd', left: '8px' },
      { key: 'g', left: '48px' },
      { key: 'h', left: '8px' },
      { key: 'j', left: '8px' },
      { key: 'l', left: '48px' },
      { key: ';', left: '8px' },
    ];
    this.whiteKeys = ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'];
    initKeyboard(this.setKeys.bind(this));
    this.state = { keysPressed: [] };
  }

  setKeys (keys) {
    this.setState({ keysPressed: keys });
  }

  render () {
    const pressed = key => this.state.keysPressed.indexOf(key) !== -1;

    return <FieldSet legend="keyboard" className="keyboard">
      <div className="inline-block shift-block">
        <div className="shift key">{"< oct"}</div>
      </div>
      <div className="inline-block">
        <div className="recording-keys">
          <div className={pressed('e') ? 'key erase pressed' : 'key erase'}>
            e
            <span>erase</span>
          </div>
          <div className={pressed('r') ? 'key record pressed' : 'key record'}>
            r
            <span>record</span>
          </div>
          <div className={pressed('p') ? 'key play pressed' : 'key play'}>
            p
            <span>play/stop</span>
          </div>
        </div>
        <div className="black-keys">
          {this.blackKeys.map(key => <div key={key.key} className={pressed(key.key) ? 'key black pressed' : 'key black'} style={{marginLeft: key.left}}>{key.key}</div>)}
        </div>
        <div className="white-keys">
          {this.whiteKeys.map(key => <div key={key} className={pressed(key) ? 'key white pressed' :'key white'}>{key}</div>)}
        </div>
      </div>
      <div className="inline-block shift-block">
        <div className="shift key">{"oct >"}</div>
      </div>
      <div className="midi-btn-wrap">
        <MidiButton />
      </div>
    </FieldSet>;
  }
}

export default Keyboard;
