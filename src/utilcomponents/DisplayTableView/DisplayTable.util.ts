import { hasString } from '../../utils/general.util';

export const getValue = (key: string, record: any) => {
  let value = '';
  if (key.includes('.')) {
    value = record;
    const splitKeys = key.split('.');
    splitKeys.forEach((k: any) => {
      if (value[k]) {
        value = value[k];
      }
    });
    return value ? value.toString() : '';
  }
  return record[key] ? record[key].toString() : '';
};
export const getSearchFilter = (data: any, searchStringMap: any) => {
  let tempData = [...data];
  // eslint-disable-next-line guard-for-in
  for (const key in searchStringMap) {
    tempData = tempData.filter((record) => {
      return hasString(getValue(key, record), searchStringMap[key]);
    });
  }
  return tempData;
};
