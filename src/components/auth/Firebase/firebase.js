import app from 'firebase/app';
import 'firebase/auth';

const config = {
   apiKey: "AIzaSyAQo3yfeb_f15SrTKrmhYcCTrkIdFlwV5I",
   authDomain: "movie-app-98c6e.firebaseapp.com",
   databaseURL: "https://movie-app-98c6e.firebaseio.com",
   projectId: "movie-app-98c6e",
   storageBucket: "movie-app-98c6e.appspot.com",
   messagingSenderId: "940270834168"
 };

class Firebase {
  constructor(){
    app.initializeApp(config);

    this.auth = app.auth();
  }

  // -- Authentication API --

  // Registration User
  doRegistration = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password)
  };
  // Sign In
  doLogin = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password)
  };
  // Sign out
  doSignOut = () => this.auth.signOut();
  // Password Reset
  doPasswordReset  =   email  => this.auth.sendPasswordResetEmail(email);
  // Password Update
  doPasswordUpdate = password => this.auth.updatePassowrd(password)
}

export default Firebase;
