import React, { Component } from 'react';
import './fieldset.scss';

const FieldSet = props => <fieldset {...props} className={props.className ? props.className+ ' fieldset' : 'fieldset'}>
  <legend>{props.legend}</legend>
  {props.children}
</fieldset>;

export default FieldSet;
