import ORDER_STATES from '@/constants/order_states';
import { send } from 'emailjs-com';
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

    let order = '';
    item.items.forEach(
      (i) => (order += `/ ${i.title} $${i.price} x${i.quantity} /`),
    );

    send('service_b920d7f', 'order_client', {
      name: item.client.name,
      store_name: item.store.name,
      order,
      total: item.total,
      to_email: item.client.email,
    });

    send('service_b920d7f', 'order_seller', {
      name: item.client.name,
      surname: item.client.surname,
      phone: item.client.phone,
      document_number: item.client.document_number,
      email: item.client.email,
      order,
      total: item.total,
      store_name: item.store.name,
      to_email: item.store.email,
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
