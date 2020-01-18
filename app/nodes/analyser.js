/* ==================
 * CURRENTLY DISABLED
 * ==================
 * uncomment the node, as well as its connection and fftSize in audioContext.js
 */


import './styles/analyser.scss';
import React, { Component } from 'react';
import FieldSet from '../common/FieldSet';
import Toggle from '../common/Toggle/';
import { getTimeAnalysisData, getFreqAnalysisData, getValue } from '../utils/audioContext';
import { ANALYSER } from '../utils/nodeNames';


class Analyser extends Component {

  constructor (props) {
    super();
    this.state = { enabled: true };
    this.draw = this.draw.bind(this);
    this.timeData = null;
    this.frequencyData = null;
  }

  componentDidMount () {
    this.checkBinInterval = setInterval(this.checkForBinCount.bind(this), 500);
    this.canvasCtx = this.canvas.getContext('2d');
  }
  componentWillUnmout () {
    clearInterval(this.interval);
  }

  handleEnabledChange (enabled) {
    this.setState({ enabled });
    if (!enabled) {
      this.canvasCtx.fillStyle = "#111";
      this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  checkForBinCount () {
    const binCount = getValue(ANALYSER, 'frequencyBinCount');
    if (binCount) {
      this.bufferLength = binCount;
      this.timeData = new Uint8Array(this.bufferLength);
      this.freqData = new Float32Array(this.bufferLength);
      clearInterval(this.checkBinInterval);
      this.draw();
    }
  }

  draw () {
    requestAnimationFrame(this.draw);
    if (!this.state.enabled || !this.canvas || !this.canvasCtx || !this.bufferLength) return;
    getTimeAnalysisData(this.timeData);
    getFreqAnalysisData(this.freqData);

    this.canvasCtx.fillStyle = "#111";
    this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.canvasCtx.lineWidth = 2;
    this.canvasCtx.strokeStyle = "#00B8DB";
    this.canvasCtx.fillStyle = 'rgba(0, 184, 219, 0.5)';
    this.canvasCtx.beginPath();

    const sliceWidth = this.canvas.width * 1.0 / this.bufferLength;
    const barWidth = sliceWidth - 1;
    let x = 0;
    for (let i = 0; i < this.bufferLength; i++) {
      // line for time data (wave)
      let v = this.timeData[i] / 2;
      var y = v - (this.canvas.height / 2.6);
      if (i === 0) this.canvasCtx.moveTo(x, y);
      else this.canvasCtx.lineTo(x, y);

      // bars for frequency data
      let b = (this.freqData[i] / 1.5) + 82;
      this.canvasCtx.fillRect(x, this.canvas.height, barWidth, -b);

      x += sliceWidth;
    }
    this.canvasCtx.stroke();
  }

  render () {
    const { enabled } = this.state;
    return <FieldSet legend="analysis">
      <div className="analysis-toggle-wrap">
        <Toggle value={enabled} onChange={this.handleEnabledChange.bind(this)} />
      </div>
      <canvas id="analysis" ref={c => this.canvas = c} height="71" width="200" />
    </FieldSet>;
  }
}

export default Analyser;
