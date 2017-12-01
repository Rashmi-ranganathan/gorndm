const nodemailer = require('nodemailer');
const _ = require('lodash');
const fs = require('fs');
const Styliner = require('styliner');

const os = require("os");
const hostname = os.hostname();
const baseDir = process.cwd();
const uncDrive = '\\\\' + hostname + '\\DevTC';
const uncPath = baseDir.replace(/.*DevTC/gi, uncDrive);

const prependUNCPath = function(path, type) {
  return uncPath + path;
}

const options = { url: prependUNCPath, noCSS: false };
const styliner = new Styliner(baseDir, options);

const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'no-reply@gorndm.com',
    pass: 'keepGuessingThis'
  }
});

const FROM_ADDRESS = 'no-reply@gorndm.com';

const prepareMail = function(toList, template, title, data) {
  return new Promise(function(resolve, reject) {
    fs.readFile(template, 'utf8', function(err, file) {
      if (err) {
        console.log('ERROR!');
        reject(err);
      } else {
        styliner.processHTML(file).then(source => {
          let splitSource = source.split('<"data">');
          source = splitSource[0] + data + splitSource[1];
          console.log('source : ', source)
          const mailOptions = {
            from: "RNDM <" + FROM_ADDRESS + ">",
            to: toList,
            replyTo: FROM_ADDRESS,
            subject: title,
            html: source
          };
          transport.sendMail(mailOptions)
            .then(result => {
              resolve(result);
            })
            .catch(error => {
              reject(error);
            })
        });
      }
    });
  });
};

let email = {
  welcomeEmail: (userEmail, userName) => {;
    const template = baseDir + '/emailContent/welcomeEmail.html';
    const title = 'Welcome to RNDM';
    return new Promise(function(resolve, reject) {

      prepareMail(userEmail, template, title, userName).then(result => {
          resolve(result.response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  sendInviteEmail: (emailList, waitingList) => {
    let list = _.join(emailList, ',');
    console.log(list)
    const template = baseDir + '/emailContent/inviteEmail.html';
    const title = 'Invited to RNDM';
    return new Promise(function(resolve, reject) {

      prepareMail(list, template, title, waitingList).then(result => {
          console.log(result)
          resolve(result.response);
        })
        .catch(error => {
          console.log(3, error)
          reject(error);
        });
    });
  },
};

module.exports = email;
