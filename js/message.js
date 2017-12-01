const axios = require('axios');
const twilio = require('twilio');

// Twilio account
var accountSid = 'AC86a3760dcb5031a123f05818c6617d4a'; // Your Account SID from www.twilio.com/console
var authToken = 'afbc5c9c53a69a7f2bbdf49e91ddc7ec'; // Your Auth Token from www.twilio.com/console
var client = new twilio(accountSid, authToken);

// msg91 account
let authKey = `175496AXqgo00oxjQU59c15d9c`;

let message = {
  sendInviteMessage: (inviteId, countryId, mobileNumber) => {
    let domainUrl = 'https://www.gorndm.com';
    let message = `Hi Friend, Someone has invited you to join Rndm. Click ${domainUrl}/${inviteId} to join now!`;
    if (countryId === 91) {
      return axios.get(`https://control.msg91.com/api/sendhttp.php?authkey=${authKey}&mobiles=&message=${message}&sender=GORNDM&route=4&country=${countryId}`);
    } else {
      return new Promise(function(resolve, reject) {
        client.messages.create({
            body: message,
            to: `+${countryId}${mobileNumber}`, // Text this number
            messagingServiceSid: 'MGd3297d344692323f9f562df6529a3eb0' // From a valid Twilio number
          })
          .then(message => {
            message.data = '1';
            resolve(message)
          })
          .catch(err => {
            console.log(data)
            reject(err.message)
          });
      });
    }
  }
};

module.exports = message;
