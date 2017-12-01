import React, { Component } from 'react';

class Loader extends Component {
  render() {
    return (
      <div className="blobs">
        <div className="blob blob-main">
          <div className="glow-wrapper"></div>
        </div>
        <div className="blob"></div>
        <div className="blob"></div>
        <div className="blob"></div>
      </div>
    );
  }
}

export default Loader
