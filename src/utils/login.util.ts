import {
  hideLoading,
  secondServerInvokeMethod,
  showLoading,
  showNotification,
  storeInvokeMethod,
} from './general.util';
import { openTabsStore, savedOrgStore } from '../stores/stores';

export const updateLogins = async (sessionInfo: any) => {
  const loginTable = await storeInvokeMethod('get-table', {
    tableName: 'Login',
  });
  let filterLogins: any[] = [];
  if (loginTable) {
    filterLogins = loginTable.filter(
      (row: any) => row.username !== sessionInfo.username,
    );
  }
  filterLogins.push(sessionInfo);
  return storeInvokeMethod('set-table', {
    tableName: 'Login',
    value: filterLogins,
  });
};
export const deleteLogin = async (sessionInfo: any) => {
  const loginTable = await storeInvokeMethod('get-table', {
    tableName: 'Login',
  });
  let filterLogins: any[] = [];
  if (loginTable) {
    filterLogins = loginTable.filter(
      (row: any) => row.username !== sessionInfo.username,
    );
  }
  return storeInvokeMethod('set-table', {
    tableName: 'Login',
    value: filterLogins,
  });
};
export const deleteOpenTabs = async (sessionInfo: any) => {
  const loginTable = await storeInvokeMethod('get-table', {
    tableName: 'Tabs',
  });

  let filterLogins: any[] = [];
  if (loginTable) {
    filterLogins = loginTable.filter(
      (row: any) => row.username !== sessionInfo.username,
    );
  }
  return storeInvokeMethod('set-table', {
    tableName: 'Tabs',
    value: filterLogins,
  });
};
export const updateOpenTabs = async (sessionInfo: any) => {
  const loginTable = await storeInvokeMethod('get-table', {
    tableName: 'Tabs',
  });
  let filterLogins: any[] = [];
  if (loginTable) {
    filterLogins = loginTable.filter(
      (row: any) => row.username !== sessionInfo.username,
    );
  }
  filterLogins.push(sessionInfo);
  return storeInvokeMethod('set-table', {
    tableName: 'Tabs',
    value: filterLogins,
  });
};
export const refreshOpenTabs = async () => {
  const { setOpenTabs } = openTabsStore.getState();
  const openTabsList = await storeInvokeMethod('get-table', {
    tableName: 'Tabs',
  });
  setOpenTabs(openTabsList);
};
export const refreshSavedLogins = async () => {
  const { setSavedOrg } = savedOrgStore.getState();
  const openTabsList = await storeInvokeMethod('get-table', {
    tableName: 'Login',
  });
  setSavedOrg(openTabsList);
};
export const handleLoginUsingUsernamePassword = async (values: any) => {
  showLoading();
  const response = await secondServerInvokeMethod(
    'login',
    {
      username: values.username,
      password: values.password,
      instance: values.instance,
    },
    {},
  );
  if (response.success) {
    showNotification(false, 'Logged In Successfully !!');
    const loginInfo: any = {
      username: values.username,
      password: values.password,
      instanceUrl: response.instanceUrl,
      accessToken: response.accessToken,
    };
    // Get a specific parameter value by name
    const identityResult = await secondServerInvokeMethod(
      'identity',
      loginInfo,
      {},
    );
    const sessionInfo = {
      instanceUrl: response.instanceUrl,
      instance: values.instance,
      accessToken: response.accessToken,
      username: identityResult.username,
      password: values.password,
      picture: identityResult.photos.picture,
      email: identityResult.email,
      displayName: identityResult.display_name,
      success: true,
      expiryDate: new Date(),
    };

    await updateLogins(sessionInfo);
    await updateOpenTabs(sessionInfo);
    await refreshOpenTabs();
    await refreshSavedLogins();
    hideLoading();
    return sessionInfo;
  }
  showNotification(false, response.error);
  hideLoading();
  return { success: false };
};
