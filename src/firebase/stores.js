import firebase from 'firebase/app';

const collection = () => firebase.firestore().collection('stores');

export const storeRef = (id) => collection().doc(id);

export const createStore = (data) => {
  return collection().add(data);
};

export const getStores = () => {
  return collection()
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

export const getStore = (id) => {
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
  return collection().doc(id).update(data);
};
