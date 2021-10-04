import firebase from 'firebase/app';

const collection = () => firebase.firestore().collection('stores');

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
