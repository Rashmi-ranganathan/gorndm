import React, { Component } from 'react';

//components
import LeaderBoard from './leaderBoard.jsx';
import Footer from './footer.jsx';
import Loader from './loader.jsx';
import InviteSent from './inviteSent.jsx';

// import InviteList from './inviteList.jsx';
import ContactList from './contactList.jsx';

class Landing extends Component {
  handleGetContact(e){
    e.preventDefault();
    this.props.handleGetContact(e);
  }
  handleSubmit(e){
    this.props.handleSubmit(e);
  }
  handleChange(e){
    this.props.handleChange(e);
  }
  logout(e){
    this.props.logout(e);
  }
  toggleEmail(data, e){
    this.props.toggleEmail(e, data);
  }
  sendInvites(e){
    this.props.sendInvites(e);
  }
  addNewEmail(e){
    this.props.addNewEmail(e);
  }

  render() {
    let coins = this.props.coins > 999 ? Math.round(this.props.coins/1000) + 'k' : this.props.coins;
    let infront = (this.props.userRank - 1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let inback = (this.props.waitingList - this.props.userRank).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let displayName = this.props.user.displayName ? this.props.user.displayName.split(' ')[0] : this.props.user.email.split('@')[0];
    let rightSideData;
    if(this.props.loadContact){
      rightSideData = <div className="loading-cover"><Loader/></div>
    } else if(this.props.isContactFetched){
      rightSideData = <ContactList
        contacts = { this.props.contacts } 
        accessToken = { this.props.accessToken }
        emailSearch = { this.props.emailSearch }
        clearAllContacts = { this.props.clearAllContacts }
        selectAllContacts = { this.props.selectAllContacts }
        addNewEmail = {this.props.addNewEmail}
        handleEmailSearch = { this.props.handleEmailSearch }
        toggleEmail = { this.props.toggleEmail.bind(this) }
        sendInvites = {this.props.sendInvites.bind(this)}
      />
    } else {
      rightSideData = <LeaderBoard 
        rankList = {this.props.rankList} 
        userRank = {this.props.userRank}
        userDetail = {this.props.userDetail}
      />
    }

    let homeMessage = this.props.newUser ? 
      <div className = "message message-newuser">
        <div className = "meesage-thanks">Thank you so much for your support 
          <span role="img" aria-label="thank_emoji"> 🙏 </span>
          <span role="img" aria-label="praise_emoji"> 🙌 </span>
          <div className = "message-small">Help us by inviting your friends and unlock premium features on launch</div>
        </div>
        <div className = "message-text">People in front of you</div>
        <div className = "message-count">{this.props.userRank - 1}</div>
        <div className = "message-text">Want to get ahead of the line ? Just invite friends </div>
        <div className = "message-earn">Earn 5000 rndm coins for each friend joins 
          <span role="img" aria-label="money_emoji"> 🤑 </span>
          <span role="img" aria-label="wow_emoji"> 😱 </span>
        </div>
      </div> :
      <div className = "message">
        <div className = "meesage-thanks">Welcome back
          <div className = "message-small">Help us by inviting your friends and unlock premium features on launch</div>
        </div>
        <div className = "message-text">People in front of you</div>
        <div className = "message-count">{infront}</div>
        <div className = "message-text">People behind you</div>
        <div className = "message-count">{inback}</div>
        <div className = "message-text">Want to get ahead of the line ? Just invite friends </div>
        <div className = "message-earn">Earn 5000 rndm coins for each friend joins 
          <span role="img" aria-label="money_emoji"> 🤑 </span>
          <span role="img" aria-label="wow_emoji"> 😱 </span>
        </div>
        {this.props.isContactFetched ? '' :
        <button className ='contact-fetch' onClick = { this.handleGetContact.bind(this)}> Invite your friends from Google </button>}
      </div> ;
    
    console.log(this.props.inviteSentPage)
    let homepage = 
      this.props.inviteSentPage ? <div className = "homepage"><InviteSent/></div>: 
      <div className = "homepage">
        {homeMessage}{rightSideData}
      </div>;

    return (
      <div className= "landing">
        <div className="header-landing">
          <div className="header-landing-title">rndm</div>
            <div className="header-landing-right">
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
        </div>
        {homepage}
          {/* <section className = "add-item">
            <form onSubmit = { this.handleSubmit.bind(this) }>
              <input type = "text" name = "phoneNumber" placeholder = "Friends's Number" onChange = { this.handleChange.bind(this) } value = { this.props.phoneNumber }/>
              <button> Send Invite </button>
            </form>
          </section>
          <ContactList contacts = { contacts } accessToken = { this.props.accessToken }/> 
          <LeaderBoard rankList = { this.props.rankList }/>
          <InviteList inviteList = { this.props.inviteList }/>*/
          }
        <Footer />
      </div>
    );
  }
}

export default Landing
