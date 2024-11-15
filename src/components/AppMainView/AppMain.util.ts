import { serverInvokeMethod } from '../../utils/general.util';
import { handleLoginUsingUsernamePassword } from '../../utils/login.util';

const checkLoginInfo = async (loginInfo: any) => {
  let response = await serverInvokeMethod(
    'isSessionTokenActive',
    loginInfo,
    {},
  );
  if (!response.success) {
    response = await handleLoginUsingUsernamePassword(loginInfo);
    if (!response.success) {
      return false;
    }
  }
  return true;
};
export default checkLoginInfo;
