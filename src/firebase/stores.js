import firebase from 'firebase/app';
import { getCurrentUser } from './auth';
import { userRef } from './users';

const collection = () => firebase.firestore().collection('stores');

export const storeRef = (id) => collection().doc(id);

export const createStore = (data) => {
  data.created_at = firebase.firestore.FieldValue.serverTimestamp();
  data.user_ref = userRef(getCurrentUser().uid);
  return collection().add(data);
};

export const getStores = () => {
  return collection()
    .where('user_ref', '==', userRef(getCurrentUser().uid))
    .get()
    .then((docs) => {
      const data = [];
      docs.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      return data;
    });
};

export const getStore = (id, config) => {
  if (config?.slug === true) {
    return collection()
      .where('slug', '==', id)
      .get()
      .then((res) => {
        if (res.docs.length < 1) {
          return null;
        }
        const doc = res.docs[0];
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
  }
  return collection()
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return {
          id: doc.id,
          ...doc.data(),
        };
      }
      return null;
    });
};

export const deleteStore = (id) => {
  return collection().doc(id).delete();
};

export const updateStore = (id, data) => {
  data.updated_at = firebase.firestore.FieldValue.serverTimestamp();
  return collection().doc(id).update(data);
};
