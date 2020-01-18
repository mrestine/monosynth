import './presets.scss';
import React, { Component } from 'react';
import presets from '../../presets';

class Presets extends Component {

  constructor (props) {
    super();
  }

  render () {
    const { onChange, selected } = this.props;
    return <div id="presets">
      {presets.map((preset, i) => 
        <div className="preset" key={i} onClick={() => onChange(preset)}>
          <div className="preset-tick">
            <span>{selected === preset.name ? '*' : ' '}</span>
            <span>~</span>
          </div>
          <div className="preset-label">
            <span>{preset.name}</span>
            <span>~~~~~~~~</span>
          </div>
        </div>
      )}
    </div>;
  }
}

export default Presets;
