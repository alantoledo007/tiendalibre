import firebase from 'firebase/app';
import { updateUser } from './users';

const mapUserFromFirebaseAuth = (user) => {
  return {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
  };
};

export const sendPasswordResetEmail = (email) => {
  return firebase.auth().sendPasswordResetEmail(email);
};

export const onAuthStateChange = (handler) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuth(user) : null;
    return handler(normalizedUser);
  });
};

export const logout = () => firebase.auth().signOut();

export const loginWithEmailAndPassword = ({ email, password }) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const registerWithEmailAndPassword = ({
  email,
  password,
  name,
  surname,
}) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async (credentials) => {
      return firebase
        .firestore()
        .collection('users')
        .doc(credentials.user.uid)
        .set({
          created_at: firebase.firestore.FieldValue.serverTimestamp(),
          name,
          surname,
          email,
        });
    });
};

export const getCurrentUser = () => {
  return mapUserFromFirebaseAuth(firebase.auth().currentUser);
};

export const reauthenticate = (password) => {
  const user = firebase.auth().currentUser;
  const cred = firebase.auth.EmailAuthProvider.credential(user.email, password);
  return user.reauthenticateWithCredential(cred);
};

export const updatePassword = (new_password) => {
  const user = firebase.auth().currentUser;
  return user.updatePassword(new_password);
};

export const updateEmail = (new_email) => {
  const user = firebase.auth().currentUser;
  return user.updateEmail(new_email).then(() => {
    return updateUser(user.uid, { email: new_email });
  });
};
