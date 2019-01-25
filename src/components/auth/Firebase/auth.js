import { auth, db, storageRef } from './firebase';

// -- Authentication API --

// Registration User
export const doRegistration = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
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
export const doPasswordUpdate = password => auth.currentUser.updatePassword(password)

// create user with other data in database
export const doCreateUser     = (id, username, email, role = 'USER') => {
  return db.ref(`users/${id}`).set({
    username,
    email,
    role
  })
}

export const doUpdateProfile = (photo) => {
  return new Promise((resolve, reject) => {
    const stRef = storageRef.child(`profile/${photo.name}`)
    resolve(stRef.put(photo))
  })
  .then(() => {
    db.ref(`users/${auth.currentUser.uid}`).update({
      profileImg : photo.name
    })
  })
}

// Update Movies Lists User

export const updateMovieListUser = (listID) => {
  return db.ref(`users/${auth.currentUser.uid}/lists`).update({
    [listID * 1] : listID
  })
}

export const deleteMovieListUser = listId => {
  return db.ref(`users/${auth.currentUser.uid}/lists`).child(listId).remove()
}

// get users from database
export const onceGetUsers = () => db.ref('users').once('value')
