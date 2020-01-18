import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Synth from './common/Synth';

ReactDOM.render(
  <Synth />, 
  document.getElementById('root')
);

module.hot.accept();
