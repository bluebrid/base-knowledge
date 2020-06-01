import { OrderedMap } from 'immutable';

export function createOrderedMap(array, idFieldName, instanceInterface) {
  return array.reduce((acc, el) => {
    return acc.set(el[idFieldName], new instanceInterface(el));
  }, new OrderedMap({}));
}

export function addRecordToMap(map, idFieldName, data, instanceInterface) {
  return map.set(data[idFieldName], new instanceInterface(data));
}

export function updateItemInMap(map, id, data) {
  const item = map.get(id);
  if (!item) return map;
  return map.set(id, updateRecord(item, data));
}

export function updateRecord(rec, data) {
  return rec.merge(data);
}

export function deleteItemFromMap(map, id) {
  return map.delete(id);
}
