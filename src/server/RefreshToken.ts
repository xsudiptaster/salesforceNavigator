import { CLIENT_ID, CLIENT_SECRET, versionInt } from './config';

const jsforce = require('jsforce');

const refreshToken = async (data: any) => {
  try {
    const conn: any = new jsforce.Connection({
      instanceUrl: data.instanceUrl,
      version: versionInt,
    });
    const result = await conn.requestPost(
      `/services/oauth2/token?grant_type=refresh_token&client_id=${
        CLIENT_ID
      }&client_secret=${CLIENT_SECRET}&refresh_token=${data.refreshToken}`,
      {},
    );
    return result;
  } catch (err: any) {
    return {
      success: false,
      error: err.message,
    };
  }
};
export default refreshToken;
