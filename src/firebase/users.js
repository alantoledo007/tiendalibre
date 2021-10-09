import firebase from 'firebase/app';

const collection = () => firebase.firestore().collection('users');

export const userRef = (id) => collection().doc(id);

export const getUser = (id) => {
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

export const deleteUser = (id) => {
  return collection().doc(id).delete();
};

export const updateUser = (id, data) => {
  data.updated_at = firebase.firestore.FieldValue.serverTimestamp();
  return collection().doc(id).update(data);
};
