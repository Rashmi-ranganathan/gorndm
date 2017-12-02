const bodyParser = require('body-parser');
const express = require("express");
var cors = require('cors');

const message = require('./js/message.js');
const email = require('./js/email.js');
const helperFunction = require('./js/helperFunction.js');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

console.log('environment', process.env.NODE_ENV)

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(`${__dirname}/client/build`));
}

const router = express.Router();

router.get("/api/sendMessage", (req, res) => {
  let key = req.query.key,
    inviteeCC = req.query.cc,
    inviteeNumber = req.query.number;

  message.sendInviteMessage(key, inviteeCC, inviteeNumber)
    .then(result => {
      if (isNaN(parseFloat(result.data))) {
        res.send({ error: result.data });
      }
      res.send({ data: result.data });
    }).catch(err => {
      res.send({ error: err });
    })
});

router.get("/api/getContacts", (req, res) => {
  let token = req.query.token;
  helperFunction.getContactlist(token)
    .then(result => {
      res.send({ data: result });
    }).catch(err => {
      res.send({ error: err });
    })
});

router.post("/api/sendEmailInvite", (req, res) => {
  let emailList = req.body.emails;
  let waitingList = req.body.waitingList;
  let result = email.sendInviteEmail(emailList, waitingList).then(result => {
    res.send({ data: result});
  }).catch(error => {
    res.send({ error: error});
  })
});

router.post("/api/welcomeEmail", (req, res) => {
  console.log('here')
  let userEmail = req.body.email;
  let userName = req.body.name;
  let result = email.welcomeEmail(userEmail, userName).then(result => {
    console.log(result)
    res.send(result);
  }).catch(error => {
    res.send(error);
  })
});

app.use(router)
app.set('port', (process.env.PORT || 3001))
app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`)
})


/*

const express = require("express");
const fs = require("fs");
const sqlite = require("sql.js");

const filebuffer = fs.readFileSync("db/usda-nnd.sqlite3");

const db = new sqlite.Database(filebuffer);

const app = express();

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});


*/
