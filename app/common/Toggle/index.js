import React, { Component } from 'react';
import './toggle.scss';

class Toggle extends Component {

  constructor (props) {
    super();
    this.state = {
      on: props.value || false,
    };
  }

  componentDidUpdate (prevProps) {
    const { value } = this.props;
    if (prevProps.value === value) return;
    else this.setState({ on: value });
  }

  handleToggle () {
    const newOn = !this.state.on;
    this.setState({ on: newOn });
    this.props.onChange(newOn);
  }

  render () {
    const { on } = this.state;
    const { className } = this.props;

    return <div className={className ? className + ' toggle-wrap' : 'toggle-wrap'} onClick={this.handleToggle.bind(this)}>
      <div className="toggle-track" />
      <div className={`${on ? 'on ' : ''} toggle`} />
    </div>;
  }
}

export default Toggle;
