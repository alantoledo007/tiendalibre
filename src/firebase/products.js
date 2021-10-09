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

export const getProduct = (id, { store }) => {
  return collection()
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = {
          id: doc.id,
          ...doc.data(),
        };

        if (store === true) {
          return data.store_ref.get().then((store) => {
            if (store.exists) {
              data.store = {
                id: store.id,
                ...store.data(),
              };
              return data;
            }
            return null;
          });
        }
        return data;
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
