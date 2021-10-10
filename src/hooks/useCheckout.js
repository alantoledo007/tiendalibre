import _ from 'lodash';

export default function useCheckout(items) {
  const items_by_store = _.groupBy(items, 'store_id');

  return {
    items_by_store,
    stores_length: Object.keys(items_by_store).length,
  };
}
