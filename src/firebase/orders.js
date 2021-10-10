import firebase from 'firebase/app';

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
      status: 'pending', //pending / confirmed / completed / rejected / cancelled
    });
  });

  return batch.commit();
};
