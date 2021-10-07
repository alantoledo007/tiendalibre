import firebase from 'firebase/app';
import { storeRef } from './stores';

const collection = () => firebase.firestore().collection('products');

export const createProduct = (data) => {
  data.created_at = firebase.firestore.FieldValue.serverTimestamp();
  data.price = parseFloat(data.price);
  data.stock = parseInt(data.stock);
  return collection().add(data);
};

export const getProducts = (store_id) => {
  return collection()
    .where('store_ref', '==', storeRef(store_id))
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

export const getProduct = (id) => {
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

export const deleteProduct = (id) => {
  return collection().doc(id).delete();
};

export const updateProduct = (id, data) => {
  data.price = parseFloat(data.price);
  data.stock = parseInt(data.stock);
  data.updated_at = firebase.firestore.FieldValue.serverTimestamp();
  return collection().doc(id).update(data);
};
