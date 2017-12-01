const axios = require('axios');
const _ = require('lodash');

let helperFunction = {
  getContactlist: (accessToken) => {
    return new Promise(function(resolve, reject) {
      axios.get(`https://www.google.com/m8/feeds/contacts/default/thin?access_token=${accessToken}&alt=json&max-results=200&v=3`).then(result => {
          let contactEmails = _.chain(_.filter(result.data.feed.entry, 'gd$email')
            .map(item => {
              let photoUrl = item.link[0].hasOwnProperty('gd$etag') ? `${item.link[0].href}&access_token=${accessToken}` : '';
              return { name: item.title.$t, email: item.gd$email[0].address, photoUrl }
            })).__wrapped__;

          let contactNumbers = _.chain(_.filter(result.data.feed.entry, 'gd$phoneNumber[0].uri')
            .map(item => {
              let n = item.gd$phoneNumber[0].uri;
              let phoneNumber = n.slice(n.indexOf('-')).slice(1).replace(/-/g, ''),
                countryCode = n.substring(n.indexOf('+'), n.indexOf('-')).slice(1);
              return { name: item.title.$t, countryCode, phoneNumber }
            })).__wrapped__;
          resolve({ contactEmails, contactNumbers });
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

module.exports = helperFunction;
