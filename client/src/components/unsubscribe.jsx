import React, {Component} from 'react';

class Unsubscribe extends Component {
  openTwitter() {
    var now = new Date().valueOf();
    setTimeout(function () {
      if (new Date().valueOf() - now > 100) 
        return;
      window.location = "https://twitter.com/gorndm";
    }, 50);
    window.location = "twitter://user?screen_name=gorndm";
  }
  openInsta() {
    var now = new Date().valueOf();
    setTimeout(function () {
      if (new Date().valueOf() - now > 100) 
        return;
      window.location = "https://instagram.com/justgorndm";
    }, 50);
    window.location = "instagram://user?username=justgorndm";
  }
  render() {
    return (
      <div className="unsubscribe">
        <div className="header">
          <div className="header-title">rndm</div>
          <div className="header-links">
            <a href='https://angel.co/gorndm'>
              <div className="header-links-anglelist"></div>
            </a>
            <a href="https://twitter.com/gorndm">
              <div className="header-links-twitter"></div>
            </a>
            <a href="https://instagram.com/justgorndm">
              <div className="header-links-instagram"></div>
            </a>
          </div>
        </div>
        <div className='unsubscribe-content'>
          <div className='unsubscribe-content-title'>You will be missed
            <span role="img" aria-label="cry_emoji">
              😥</span>
          </div>
          <div className='unsubscribe-content-text'>You’ve been unsubscribed from the mailing list.</div>
        </div>
        <div className="mobile-header-links header-links">
          <a href='https://angel.co/gorndm'>
            <div className="header-links-anglelist"></div>
          </a>
          <a onClick={() => {
            this.openTwitter()
          }}>
            <div className="header-links-twitter"></div>
          </a>
          <a onClick={() => {
            this.openInsta()
          }}>
            <div className="header-links-instagram"></div>
          </a>
        </div>
      </div>
    );
  }
}

export default Unsubscribe
