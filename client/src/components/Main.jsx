import React, { Component } from 'react';
import _ from 'lodash';

//Components
import Loader from './loader.jsx';
import Signin from './signin.jsx';
import Landing from './landing.jsx';
import NavigationMobile from './NavigationMobile.jsx';
import Hamburger from './Hamburger.jsx';
import constants from '../constants.js';
import firebase, { auth, provider } from '../firebase.js';
import helperFunctions from '../helperFunctions.js';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      phoneNumber: '',
      emailSearch: '',
      inviteCode: '',
      isContactFetched: null,
      rankList: null,
      inviteList: null,
      user: false,
      coins: null,
      userRank: null,
      waitingList: null,
      contacts: {},
      accessToken: null,
      newUser: true,
      loading: true,
      userDetail: null,
      loadContact: true,
      inviteSentPage: false,
      isMenuClicked : false
    };
  }

  toogleMenu(){
    let isMenuClicked = !this.state.isMenuClicked;
    this.setState({ isMenuClicked });
  }

  clearAllContacts() {
    let contactEmails = _.map(this.state.contacts.contactEmails, contact => {
      if (contact.isFiltered) {
        contact.isSelected = false;
      }
      return contact;
    });
    this.setState({ contacts: { contactEmails } });
  }

  selectAllContacts() {
    let contactEmails = _.map(this.state.contacts.contactEmails, contact => {
      if (contact.isFiltered) {
        contact.isSelected = true;
      }
      return contact;
    });
    this.setState({ contacts: { contactEmails } });
  }

  addNewEmail(e) {
    let contacts = this.state.contacts;
    contacts.contactEmails = _.map(contacts.contactEmails, item => {
      item.isFiltered = true;
      return item;
    });
    let newContact = { name: '', email: this.state.emailSearch, photoUrl: '', isSelected: true, isFiltered: true}
    contacts.contactEmails.unshift(newContact);
    this.setState({ contacts, emailSearch: '' });
  }

  handleEmailSearch(e) {
    let value = e.target.value.toLowerCase();
    let contactEmails = _.map(this.state.contacts.contactEmails, contact => {
      const isEmailPresent = contact.email.toLowerCase().includes(value);
      const isNamePresent = contact.name.toLowerCase().includes(value);
      contact.isFiltered = isEmailPresent || isNamePresent;
      return contact;
    });
    this.setState({ contacts: { contactEmails }, emailSearch: value });
  }

  toggleEmail(e, data) {
    let contactEmails = _.map(this.state.contacts.contactEmails, contact => {
      if (contact.email === data.email) {
        contact.isSelected = !contact.isSelected;
      }
      return contact;
    });
    this.setState({ contacts: { contactEmails } });
  }

  insertUser(result) {
    let info = result.additionalUserInfo.profile;
    let userDetail = {
      id: info.id,
      uid: result.user.uid,
      username: info.name || '',
      email: info.email || '',
      photoURL: info.picture || '',
      local: info.en || '',
      googlePlus: info.link || '',
      gender: info.gender || '',
      phoneNumber: result.user.phoneNumber || '',
      coins: 400,
      invites: 0,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    if (this.state.inviteCode) {
      firebase.database().ref('invites').orderByKey().equalTo(this.state.inviteCode).once('value').then(snapshot => {
        if (snapshot.val()) {
          let inviteData = snapshot.val()[this.state.inviteCode];
          inviteData.joiningStatus = true;
          userDetail.phoneNumber = result.user.phoneNumber || inviteData.inviteeNumber || '';
          userDetail.coins = 500;
          firebase.database().ref('invites/' + this.state.inviteCode).set(inviteData);
          firebase.database().ref('users/' + userDetail.uid).set(userDetail);
          firebase.database().ref('userCount').set(this.state.userRank + 1);
          firebase.database().ref('users').orderByKey().equalTo(inviteData.inviter).once('value').then(snapshot => {
            let inviterDetails = snapshot.val()[inviteData.inviter];
            inviterDetails.invites += 1;
            inviterDetails.coins += (inviterDetails.invites + inviterDetails.invites / 10) * 100;
            console.log(inviterDetails)
            firebase.database().ref('users/' + inviteData.inviter).set(inviterDetails);
          });
        }
      });
    } else {
      firebase.database().ref('users/' + userDetail.uid).set(userDetail);
      firebase.database().ref('userCount').set(this.state.userRank + 1);
    }
  }

  login(e) {
    e.preventDefault();
    auth.signInWithPopup(provider)
      .then(result => {
        this.setState({ newUser: true , loadContact: true });
        console.log(result)
        if (result.user !== null) {
          firebase.database().ref('users').orderByKey().equalTo(result.user.uid).once('value').then(snapshot => {
            let newUser = true;

            if (snapshot.val() === null) {
              this.insertUser(result);
              this.sendWelcomeEmail();
            } else {
              newUser = false;
            }

            this.setState({ user: result.user, newUser, isMenuClicked : false });
            this.fetchData();
          });
          helperFunctions.getContacts(result.credential.accessToken)
            .then(result => {
              this.setState({ contacts: result, isContactFetched: true, loadContact: false });
            })
            .catch(err => {
              this.setState({ isContactFetched: false, loadContact: false });
            });
        }
      })
      .catch(error => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
      });
  }

  logout() {
    auth.signOut().then(() => {
      this.setState({ user: null, isMenuClicked: false });
    });
  }

  handleMobileInvite(e) {
    e.preventDefault();

    const invitesList = firebase.database().ref('invites');
    let newInvite = invitesList.push();
    const inviteDetails = {
      id: newInvite.key,
      inviter: this.state.user.uid,
      inviteeNumber: this.state.phoneNumber || '',
      inviteeEmail: this.state.email || '',
      inviteeCC: '91',
      joiningStatus: false
    };

    helperFunctions.sendInviteMessage({ key: inviteDetails.id, cc: inviteDetails.inviteeCC, number: inviteDetails.inviteeNumber }).then(result => {
      newInvite.set(inviteDetails);
    }).catch(err => {
      firebase.database().ref(`invites/${inviteDetails.id}`).remove();
    });

    this.setState({ phoneNumber: '' });
  }

  sendWelcomeEmail() {
    let displayName = this.state.user.displayName ? this.state.user.displayName.split(' ')[0] : this.state.user.email.split('@')[0];    
    helperFunctions.sendWelcomeEmail(this.state.email, displayName).then(result => {
      console.log(result)
    }).catch(err => {
      console.log(err)
    });
  }

  sendEmailInvites() {
    let emails = _.map(_.filter(this.state.contacts.contactEmails, { 'isSelected': true }), item => item.email);
    let waitingList = (this.state.waitingList).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    helperFunctions.sendEmailInvite(emails, waitingList).then(result => {
      this.setState({ inviteSentPage: true });
      setTimeout(() => {
        let contacts = this.state.contacts;
        _.each(contacts.contactEmails, email => {email.isFiltered = true; email.isSelected = true});
        _.each(contacts.contactNumbers, number => {number.isFiltered = true; number.isSelected = true});
        this.setState({ inviteSentPage: false, contacts, emailSearch: '' });
      }, 40000);
    }).catch(err => {
      console.log(err)
    });
  }

  handleGetContact() {
    auth.signInWithPopup(provider).then(result => {
      if (result.user !== null) {
        this.setState({ loadContact: true });
        helperFunctions.getContacts(result.credential.accessToken)
          .then(result => {
            console.log(result)
            this.setState({ contacts: result, isContactFetched: true, loadContact: false });
          })
          .catch(err => {
            this.setState({ isContactFetched: false, loadContact: false  });
          });
      }
    })
  }

  fetchData() {
    if (this.state.user !== null) {
      const userRef = firebase.database().ref('users');
      const inviteRef = firebase.database().ref('invites').orderByChild("inviter").equalTo(this.state.user.uid);
      userRef.on('value', (snapshot) => {
        let users = snapshot.val();
        users = _.orderBy(users, constants.parameterList, constants.parameterOrder);
        let userDetail = _.find(users, { uid: this.state.user.uid });
        let userRank = userDetail ? _.findIndex(users, { uid: this.state.user.uid }) + 1 : this.state.waitingList;
        let coins = userDetail ? userDetail.coins : this.state.coins;
        let leaderBoard = users.splice(0, 3);
        leaderBoard = _.map(leaderBoard, (item, index) => {
          return {
            rank: index + 1,
            coins: item.coins,
            name: item.username,
            photoURL: item.photoURL
          }
        });
        this.setState({ rankList: leaderBoard, userRank: userRank, coins, userDetail });
      });

      inviteRef.on('value', (snapshot) => {
        let invitees = snapshot.val();
        invitees = _.map(invitees, (item, index) => {
          return {
            id: index + 1,
            phoneNumber: `+${item.inviteeCC} ${item.inviteeNumber}`,
            status: item.joiningStatus
          }
        });
        this.setState({ inviteList: invitees, loading: false });
      });
    }
  }

  componentDidMount() {
    firebase.database().ref('userCount').on('value', (snapshot) => {
      console.log(window.location.pathname.substr(1))
      this.setState({
        waitingList: snapshot.val(),
        inviteCode: window.location.pathname.substr(1)
      });
    });
    this.setState({ loadContact: false });
    auth.onAuthStateChanged((user) => {
      if (user) {
        let newUser = this.state.newUser ? null : false;
        this.setState({ user: user, isContactFetched: false, newUser });
        this.fetchData();
      } else {
        this.setState({ user: null });
      }
    });
  };

  render() {
    let data;

    if(this.state.isMenuClicked){
      data = 
        <NavigationMobile
        user = { this.state.user }
        waitingList = { this.state.waitingList }
        coins = { this.state.coins }
        login = { this.login.bind(this)}
        logout = { this.logout.bind(this) }
        /> 
    } else if (this.state.user === null) {
      data = < Signin login = { this.login.bind(this) }
      waitingList = { this.state.waitingList }
      />;
    } else if (this.state.loading) {
      data = < Loader / > ;
    } else {
      data = < Landing
      user = { this.state.user }
      userDetail = { this.state.userDetail }
      coins = { this.state.coins }
      newUser = { this.state.newUser }
      loadContact = { this.state.loadContact }
      inviteSentPage = { this.state.inviteSentPage }
      userRank = { this.state.userRank }
      waitingList = { this.state.waitingList }
      accessToken = { this.state.accessToken }
      phoneNumber = { this.state.phoneNumber }
      emailSearch = { this.state.emailSearch }
      contacts = { this.state.contacts }
      rankList = { this.state.rankList }
      inviteList = { this.state.inviteList }
      isContactFetched = { this.state.isContactFetched }
      clearAllContacts = { this.clearAllContacts.bind(this) }
      handleEmailSearch = { this.handleEmailSearch.bind(this) }
      selectAllContacts = { this.selectAllContacts.bind(this) }
      handleGetContact = { this.handleGetContact.bind(this) }
      sendInvites = { this.sendEmailInvites.bind(this) }
      toggleEmail = { this.toggleEmail.bind(this) }
      addNewEmail = { this.addNewEmail.bind(this) }
      logout = { this.logout.bind(this) }
      />;
    }

    return ( 
      <div>
      <Hamburger isMenuClicked = {this.state.isMenuClicked} toogleMenu = {this.toogleMenu.bind(this)} />
      { data } 
     </div> );
    }
  };

  export default Main;