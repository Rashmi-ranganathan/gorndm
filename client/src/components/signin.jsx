import React, { Component } from 'react';

//components
import Header from './header.jsx';
import Footer from './footer.jsx';

class Signin extends Component {
  signin(e) {
    this.props.login(e);
  }
  render() {
    let waitingCount = this.props.waitingList === null ? '' : (this.props.waitingList + 1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return (
      <div className = "signin"> 
        < Header/> 
        <div className="signin-body">
          <div className="signin-body-text">
            <div className="signin-body-text-tagline">We want you to fall in love all over again <span role="img" aria-label="love_emoji">😍</span></div>
            <div className="signin-body-text-content">
            rndm is an iOS first social experiences app where you meet new people, explore new interests, explore your passions. In rndm you can meet new people instantly and reveal yourself when comfortable than swiping across and judging others. We need your help to signup for the waitlist while we handcraft this beautiful experience.
            </div>

            <div className="signin-body-text-signin">
              <button className="signin-body-text-signin-details-button" onClick={this.signin.bind(this)}>Signup with Google</button>
              <div className="signin-body-text-signin-rank">
                <div className="signin-body-text-signin-rank-text">Current waitlist</div>
                <div className="signin-body-text-signin-rank-number">{waitingCount}</div>
              </div>
            </div>

            <div className="signin-body-text-bonusinfo">First 100k users get 10,000 rndm coins <span role="img" aria-label="money_emoji">🤑💰</span></div>
          </div>

          <div className="signin-body-image"></div>
        </div>
       <Footer/> 
      </div>
    );
  }
}

export default Signin
