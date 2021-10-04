import firebase from 'firebase/app';

const collection = () => firebase.firestore().collection('stores');

export const createStore = (data) => {
  return collection().add(data);
};
