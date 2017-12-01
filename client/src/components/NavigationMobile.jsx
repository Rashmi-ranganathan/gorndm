import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavigationMobile extends Component {
  logout(e){
    this.props.logout(e);
  }
  signin(e) {
    this.props.login(e);
  }
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
    let data;
    if(this.props.user){
      let coins = this.props.coins > 999 ? Math.round(this.props.coins/1000) + 'k' : this.props.coins;
      let displayName = this.props.user.displayName ? this.props.user.displayName.split(' ')[0] : this.props.user.email.split('@')[0];
      data = <div className="header-landing-right-mobile">
        <div className="header-profile">
          {/* <img className="header-profile-image" src = { this.props.user.photoURL } alt = "user_image"/> */}
          <div className="header-profile-name">{displayName}</div>
          <div className="header-profile-coins">{coins}</div>
          <div className="header-profile-coinsimage"></div>
        </div>
        <div className="logout">
          <button onClick = { this.logout.bind(this) }> Logout </button>
        </div>
      </div>
    } else {
      data = 
      <div className="signin-body-text-signin-mobile">
        <div className="signin-body-text-tagline">Join the party <span role="img" aria-label="ghost_emoji"> 👻</span></div>
        <button className="signin-body-text-signin-details-button" onClick={this.signin.bind(this)}>Signup with Google</button>
      </div>
    }
    return (
      <div className="hanburger-details">
        <div className="header-mobile">
          <div className="header-title">rndm</div>
        </div>
        <div className="footer">
          <Link to="/manifesto" target="_blank" className="footer-left">Founders manifesto</Link>
          <div className="footer-right">
            <Link to="/policy" target="_blank" className="footer-right-policy">Privacy policy</Link>
            <a href="mailto:youremail@address.com" className="footer-right-contact">Contact us</a>
          </div>
          <div className="header-links-mobile">
            <a href='https://angel.co/gorndm'><div className="header-links-anglelist"></div></a>
            <a onClick={() => {this.openTwitter()}}><div className="header-links-twitter"></div></a>
            <a onClick={() => {this.openInsta()}}><div className="header-links-instagram"></div></a>
          </div>
        </div>

        {data}
      </div>
    );
  }
}

export default NavigationMobile
