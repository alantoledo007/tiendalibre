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
  return collection().doc(id).update(data);
};
