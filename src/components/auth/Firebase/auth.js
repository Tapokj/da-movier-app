import { auth, db } from './firebase';

// -- Authentication API --

// Registration User
export const doRegistration = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password)
};

export const doEmailVerification = () => {
  return auth.currentUser.sendEmailVerification()
}
// Sign In
export const doLogin = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password)
};
// Sign out
export const doSignOut = () => auth.signOut();
// Password Reset
export const doPasswordReset  =   email  => auth.sendPasswordResetEmail(email);
// Password Update
export const doPasswordUpdate = password => auth.updatePassowrd(password)

// create user with other data in database
export const doCreateUser     = (id, username, email, role = 'USER') => {
  return db.ref(`users/${id}`).set({
    username,
    email,
    role
  })
}
// get users from database
export const onceGetUsers = () => db.ref('users').once('value')
