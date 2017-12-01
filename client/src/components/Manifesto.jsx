import React, {Component} from 'react';

class Manifesto extends Component {
  render() {
    return (
      <div className="header">
        <div className="header-title">Manifesto</div>
        <div className="header-links">
          <a href="https://twitter.com/gorndm">
            <div className="header-links-twitter"></div>
          </a>
          <a href='https://angel.co/gorndm'>
            <div className="header-links-anglelist"></div>
          </a>
          <a href="https://instagram.com/justgorndm">
            <div className="header-links-instagram"></div>
          </a>
        </div>
      </div>
    );
  }
}

export default Manifesto
