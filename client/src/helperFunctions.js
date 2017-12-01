import constants from './constants.js';
import _ from 'lodash';

let network = constants.network;

function sendInviteMessage(data, cb) {
  return new Promise(function(resolve, reject) {
    fetch(`${network}/api/sendMessage?key=${data.key}&cc=${data.cc}&number=${data.number}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        data.hasOwnProperty('data') ? resolve(data) : reject(data);
      })
  });
}

function getContacts(token, cb) {
  return new Promise(function(resolve, reject) {
    fetch(`${network}/api/getContacts?token=${token}`)
      .then(res => res.json())
      .then(data => {
        if (data.hasOwnProperty('data')) {
          _.each(data.data.contactEmails, email => {
            email.isFiltered = true;
            email.isSelected = true;
          });
          _.each(data.data.contactNumbers, number => {
            number.isFiltered = true;
            number.isSelected = true;
          });
          resolve(data.data)
        } else {
          reject(data.error);
        }
      })
  });
}

function sendEmailInvite(emails, waitingList, cb) {
  console.log('fe -- going to send invites')
  return new Promise(function(resolve, reject) {
    fetch(`${network}/api/sendEmailInvite`, {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ emails, waitingList })
      })
      .then(res => res.json())
      .then(data => {
        console.log('fe -- sent invites',data)
        resolve(data);
      })
      .catch(err => {
        reject(err);
      })
  });
}

function sendWelcomeEmail(email, name, cb) {
  return new Promise(function(resolve, reject) {
    fetch(`${network}/api/welcomeEmail`, {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, name })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        resolve(data);
      })
      .catch(err => {
        reject(err);
      })
  });
}

const helperFunctions = { sendInviteMessage, getContacts, sendEmailInvite, sendWelcomeEmail };
export default helperFunctions;
