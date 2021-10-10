import ORDER_STATES from '@/constants/order_states';
import firebase from 'firebase/app';
import { storeRef } from './stores';

const collection = () => firebase.firestore().collection('orders');
const getBatch = () => firebase.firestore().batch();

export const createOrders = (orders) => {
  const batch = getBatch();

  const created_at = firebase.firestore.FieldValue.serverTimestamp();

  orders.forEach((item) => {
    const ref = collection().doc();
    batch.set(ref, {
      ...item,
      client: {
        ...item.client,
        document_number: parseInt(item.client.document_number, 10),
      },
      created_at,
      status: ORDER_STATES.PENDING,
    });
  });

  return batch.commit();
};

export const getOrders = (store_id) => {
  return collection()
    .where('store.ref', '==', storeRef(store_id))
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

export const getOrder = (id) => {
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

export const updateOrder = (id, status) => {
  return collection().doc(id).update({
    status,
    updated_at: firebase.firestore.FieldValue.serverTimestamp(),
  });
};
