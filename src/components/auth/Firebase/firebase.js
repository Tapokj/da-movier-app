import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const config = {
   apiKey: "AIzaSyAQo3yfeb_f15SrTKrmhYcCTrkIdFlwV5I",
   authDomain: "movie-app-98c6e.firebaseapp.com",
   databaseURL: "https://movie-app-98c6e.firebaseio.com",
   projectId: "movie-app-98c6e",
   storageBucket: "movie-app-98c6e.appspot.com",
   messagingSenderId: "940270834168"
 };

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
const auth = firebase.auth();
const db   = firebase.database()
const storageRef = firebase.storage().ref();

export { auth, db, storageRef }
