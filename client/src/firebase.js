import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDTVd1lvyrhpsSTcnBrToHZg1jZitTHLWk",
  authDomain: "gorndm-superb.firebaseapp.com",
  databaseURL: "https://gorndm-superb.firebaseio.com",
  projectId: "gorndm-superb",
  storageBucket: "gorndm-superb.appspot.com",
  messagingSenderId: "80907027333"
};
firebase.initializeApp(config);

const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

const auth = firebase.auth();

export {
  provider,
  auth
}

export default firebase;
