import React, { Component } from 'react';
import Loader from './loader.jsx';
import _ from 'lodash';

class ContactList extends Component {
  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  sendInvites(e){
    e.preventDefault();
    this.props.sendInvites(e);
  }

  clearAllContacts(e){
    e.preventDefault();
    this.props.clearAllContacts();
  }

  selectAllContacts(e){
    e.preventDefault();
    this.props.selectAllContacts();
  }
  
  handleEmailSearch(e) {
    e.preventDefault();
    this.props.handleEmailSearch(e);
  }

  toggleEmail(data, e){
    e.preventDefault();
    this.props.toggleEmail(e, data);
  }

  addNewEmail(e){
    e.preventDefault();
    this.props.addNewEmail();
  }

  render() {
    let contactEmailList = _.isUndefined(this.props.contacts.contactEmails) ? <Loader/> : _.filter(this.props.contacts.contactEmails, {'isFiltered' : true});
    let selectedEmailCount = _.filter(this.props.contacts.contactEmails, {'isSelected' : true}).length;
    let isButtonDisabled = !contactEmailList.length || !selectedEmailCount;
    let disabledButton = isButtonDisabled ? 'disabled' : '';

    if(contactEmailList.length === 0) {
      let htmlForAddNewEmail = 
        <div className="contact-list-item" key={0}>
          <div className="contact-list-item-checkbox">
            <div className = "contact-list-item-new" onClick = { this.addNewEmail.bind(this)}></div>
            </div>
          <div className="contact-list-item-detail"> Add {this.props.emailSearch} to the list </div>
        </div>;
      contactEmailList = this.validateEmail(this.props.emailSearch) ? htmlForAddNewEmail : '';

    } else {
      contactEmailList = _.map(contactEmailList,(item, index) => {
        return (
          <div className="contact-list-item" key={index}>
            <div className="contact-list-item-checkbox">
              <div className = { item.isSelected ? "contact-list-item-checked" : "contact-list-item-unchecked"}
              onClick = { this.toggleEmail.bind(this, item)}></div>
              </div>
            <div className="contact-list-item-detail">{item.name} ({item.email}) </div>
          </div>
        );
      });
    }

    // let contactNumberList = this.props.contacts === null ? <Loader/> : 
    // this.props.contacts.contactNumbers.map((item, index) => {
    //   return (
    //     <li key={index}>
    //       <span> {item.name} + {item.countryCode}{item.phoneNumber}</span>
    //     </li>
    //   );
    // });
    
    return (
      <div className = "contacts">
        <div className = "contacts-header">
          <div className="contacts-header-text">Your friends from Google</div>
          <div className="contacts-header-select">
            <button onClick = { this.selectAllContacts.bind(this) }> select all </button>
          </div>
          <div className="contacts-header-clear">
            <button onClick = { this.clearAllContacts.bind(this) }> clear </button>
          </div>
        </div>
        <div className = "contacts-search">
          <input type = "text" name = "email" placeholder = "Search friends" onChange = { this.handleEmailSearch.bind(this)} value = {this.props.emailSearch}/>
        </div>
        <div className="contact-list">{contactEmailList}{/* <ul>{contactNumberList}</ul> */}</div>
        <button className = {"contacts-send " + disabledButton} disabled = {isButtonDisabled} onClick = { this.sendInvites.bind(this) } title = "Select one or more contacts to send Invite"> Send Invites </button>
      </div>
    );
  }
}

export default ContactList
