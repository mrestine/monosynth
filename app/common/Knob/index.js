import React, { Component } from 'react';
import './knob.scss';

class Knob extends Component {

  static defaultProps = {
    min: 0,
    max: 1, 
    step: 0.2,
    displayFix: 2,
    value: 0,
    minAngle: Math.PI * -3 / 4,
    maxAngle: Math.PI * 3 / 4,
    label: '',
  }

  constructor (props) {
    super();
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);

    const { step, max, min, minAngle, maxAngle, value } = props;
    const numSteps = (max - min) / step;
    const stepAngle = (maxAngle - minAngle) / numSteps;
    const qAngles = [];
    for (let i = 0; i <= numSteps; i++) {
      qAngles.push(minAngle + (i*stepAngle));
    }
    const valuePercentage = Math.abs(value - min) / (max - min);
    const rotation = minAngle + ((maxAngle - minAngle) * valuePercentage);

    this.qAngles = qAngles;
    this.state = {
      rotating: false,
      origin: { x: 0, y: 0 },
      rotation: rotation,
    };
  }

  componentDidUpdate (prevProps) {
    if (prevProps.value === this.props.value) return;
    const { step, max, min, minAngle, maxAngle, value } = this.props;
    const valuePercentage = Math.abs(value - min) / (max - min);
    const rotation = minAngle + ((maxAngle - minAngle) * valuePercentage);
    this.setState({ rotation: rotation });
  }

  handleMouseDown (ev) {
    this.setState({ rotating: true, origin: { x: ev.clientX, y: ev.clientY } });
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseMove (ev) {
    const { origin, rotation } = this.state;
    const { step, min, max, displayFix } = this.props;
    const dx = ev.clientX - origin.x;
    const dy = origin.y - ev.clientY;
    let newAngle = this.quantizeAngle(Math.atan2(dx, dy), 0, this.qAngles.length);
    if (newAngle !== rotation) {
      const newValue = Number((min + (this.qAngles.indexOf(newAngle) * step)).toFixed(displayFix));
      this.setState({ rotation: newAngle });
      this.props.onChange(newValue);
    }
  }

  handleMouseUp (ev) {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
    this.setState({ rotating: false });
  }

  quantizeAngle (angle, start, end) {
    const m = Math.floor((start + end) / 2);
    const d = this.qAngles;
    if (angle == d[m]) return angle;
    if (end - 1 === start) return Math.abs(d[start] - angle) > Math.abs(d[end] - angle) ? d[end] : d[start];
    if (angle > d[m]) return this.quantizeAngle(angle, m, end);
    if (angle < d[m]) return this.quantizeAngle(angle, start, m);
  }

  render () {
    const { rotation } = this.state;
    const { displayFix, label, value } = this.props;
    return <div className="knob-container">
      <div className="knob-label">{label}</div>
      <div className="knob-outer">
        <div style={{ transform: `rotate(${rotation}rad)` }} className="knob" onMouseDown={this.handleMouseDown} />
        <div className="value">{value.toFixed(displayFix)}</div>
        <div className="min tick" />
        <div className="max tick" />
      </div>
    </div>;
  }
}

export default Knob;
