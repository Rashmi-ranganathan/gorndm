import React from 'react';
import { Link } from 'react-router-dom';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}