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

const noreply = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'no-reply@gorndm.com',
    pass: 'keepGuessingThis'
  }
});

const bala = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'bala@gorndm.com',
    pass: 'E4Z-zn2-GyU-c5h'
  }
});

const transport = [bala, noreply];

const FROM_ADDRESS = ['bala@gorndm.com', 'no-reply@gorndm.com'];
const testingEmail = 'rashmi05rash@gmail.com';

const prepareMail = function(toList, template, title, data, accountId) {
  let TO_ADDRESS = process.env.NODE_ENV === "production" ? toList : testingEmail;
  return new Promise(function(resolve, reject) {
    fs.readFile(template, 'utf8', function(err, file) {
      if (err) {
        console.log('ERROR!');
        reject(err);
      } else {
        styliner.processHTML(file).then(source => {
          let splitSource = source.split('<"data">');
          source = splitSource[0] + data + splitSource[1];
          const mailOptions = {
            from: "RNDM <" + FROM_ADDRESS[accountId] + ">",
            to: TO_ADDRESS,
            replyTo: FROM_ADDRESS,
            subject: title,
            html: source
          };
          transport[accountId].sendMail(mailOptions)
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

      prepareMail(userEmail, template, title, userName, 0).then(result => {
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

      prepareMail(list, template, title, waitingList, 1).then(result => {
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
