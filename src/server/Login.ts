import { versionInt } from './config';

const jsforce = require('jsforce');

const login = async (data: any) => {
  try {
    const conn = new jsforce.Connection({
      loginUrl: data.instance,
      version: versionInt,
    });
    const userInfo = await conn.login(data.username, data.password);
    return {
      success: true,
      instanceUrl: conn.instanceUrl,
      accessToken: conn.accessToken,
      userInfo,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message,
    };
  }
};
export default login;
