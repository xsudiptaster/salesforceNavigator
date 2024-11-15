import { notifications } from '@mantine/notifications';
import { useLoadingInfoStore } from '../stores/stores';

export const serverInvokeMethod = async (
  method: string,
  loginInfo: any,
  data: any,
) => {
  const tempData1 = { ...data, ...loginInfo };
  const responseFirst = await window.electron.ipcRenderer.serverInvoke({
    method,
    data: tempData1,
  });
  return responseFirst;
};
export const secondServerInvokeMethod = async (
  method: string,
  loginInfo: any,
  data: any,
) => {
  const tempData = { ...loginInfo, ...data };
  return window.electron.ipcRenderer.serverInvoke({ method, data: tempData });
};
export const oAuthInvokeMethod = async (data: any) => {
  return window.electron.ipcRenderer.oauthInvoke(data);
};
export const storeInvokeMethod = async (method: any, data: any) => {
  return window.electron.ipcRenderer.storeInvoke({ method, data });
};

export const showNotification = (isError: boolean, message: string) => {
  notifications.show({
    title: isError ? 'ERROR' : 'SUCCESS',
    message,
    position: 'top-center',
    color: isError ? 'red' : 'blue',
  });
};
export const showLoading = () => {
  const { setLoadingInfo } = useLoadingInfoStore.getState();
  setLoadingInfo({
    loading: true,
    showBar: false,
    value: 0,
  });
};
export const hideLoading = () => {
  const { setLoadingInfo } = useLoadingInfoStore.getState();
  setLoadingInfo({
    loading: false,
    showBar: false,
    value: 0,
  });
};
export const showProgress = (current: number, total: number) => {
  const { setLoadingInfo } = useLoadingInfoStore.getState();
  setLoadingInfo({
    loading: true,
    showBar: true,
    value: (current / total) * 100,
  });
};

export const onCopy = (value: string) => {
  navigator.clipboard.writeText(value);
  showNotification(false, 'Copied!!');
};

export const hasString = (mainString: string, searchString: string) => {
  if (searchString === '') {
    return true;
  }
  const searchWords = searchString.split(' ');
  // Check if every word is present in the main string
  return searchWords.every((word) =>
    mainString !== undefined && mainString !== ''
      ? mainString.toLowerCase().includes(word.toLowerCase())
      : false,
  );
};
export const flattenObject = (obj: any, parentKey = '', result: any = {}) => {
  // eslint-disable-next-line guard-for-in
  for (const key in obj) {
    // Create a new key by combining the parent key and the current key
    const newKey = parentKey ? `${parentKey}.${key}` : key;
    // Check if the value is an object and not null
    if (
      typeof obj[key] === 'object' &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      // Recursively flatten the object
      flattenObject(obj[key], newKey, result);
    } else {
      // Assign the value to the new key in the result object
      result[newKey] = obj[key];
    }
  }
  return result;
};
