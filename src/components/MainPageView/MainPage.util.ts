import { handleLoginUsingUsernamePassword } from '../../utils/login.util';
import { storeInvokeMethod } from '../../utils/general.util';

export const handleLogin = async (values: any) => {
  console.log(values);
  const org = {
    username: values.username,
    password: values.password,
    instance: values.instance
      ? 'https://login.salesforce.com'
      : 'https://test.salesforce.com',
  };
  return handleLoginUsingUsernamePassword(org);
};
export const getSavedLoginOrgs = async () => {
  return storeInvokeMethod('get-table', {
    tableName: 'Login',
  });
};
export const openInChrome = async (sessionInfo: any) => {
  const url = `${sessionInfo.instanceUrl}/secur/frontdoor.jsp?sid=${
    sessionInfo.accessToken
  }`;
  window.open(url, '_blank');
};
