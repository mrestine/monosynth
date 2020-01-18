import React, { Component } from 'react';
import './select.scss';

class Select extends Component {

  constructor (props) {
    super();
    this.maxLength = Math.max(...props.options.map(o => o.label.length));
    this.state = { 
      selected: props.value,
      selectedIndex: props.options.findIndex(i => i.value == props.value),
    };
  }

  componentDidUpdate (prevProps) {
    const { value, options } = this.props;
    if (prevProps.value === value) return;
    else this.setState({ selected: value, selectedIndex: options.findIndex(i => i.value === value)});
  }

  handleUpClick () {
    const { selectedIndex } = this.state;
    const { options, onChange } = this.props;
    if (selectedIndex > 0) {
      const newIndex = selectedIndex - 1;
      this.setState({ 
        selectedIndex: newIndex,
        selected: options[newIndex].value
      });
      onChange(options[newIndex].value);
    }
  }
  handleDownClick () {
    const { selectedIndex } = this.state;
    const { options, onChange } = this.props;
    if (options.length - 1 > selectedIndex) {
      const newIndex = selectedIndex + 1;
      this.setState({ 
        selectedIndex: newIndex,
        selected: options[newIndex].value
      });
      onChange(options[newIndex].value);
    }
  }

  render () {
    const { selected, selectedIndex } = this.state;
    const { options, onChange } = this.props;
    const selectedLabel = options[selectedIndex].label;
    const canAscend = selectedIndex > 0;
    const canDescend = options.length - 1 > selectedIndex;

    return <div className="select-box">
      <span className="label text">{selectedLabel}</span>
      <span className="label shadow">{'~'.repeat(this.maxLength)}</span>
      <div className="select-btns-wrap">
        <div className={canAscend ? 'select-btn up' : 'select-btn up disabled'} onClick={this.handleUpClick.bind(this)} />
        <div className={canDescend ? 'select-btn down' : 'select-btn down disabled'} onClick={this.handleDownClick.bind(this)} />
      </div>
    </div>;
  }
}

export default Select;
