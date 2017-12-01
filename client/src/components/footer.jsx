import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
      <div className="footer-wrapper">
        <div className="footer">
          {/* <Link to="/manifesto" target="_blank" className="footer-left">Founders manifesto</Link> */}
          <a href="mailto:bala@address.com" className="footer-left">Contact us</a>
          <div className="footer-right">
            <Link to="/policy" target="_blank" className="footer-right-policy">Privacy policy</Link>
            {/* <a href="mailto:bala@address.com" className="footer-right-contact">Contact us</a> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Footer
