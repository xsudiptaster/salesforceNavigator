import { versionInt } from './config';

const jsforce = require('jsforce');

const getApexLogBody = async (data: any) => {
  try {
    const conn = new jsforce.Connection({
      instanceUrl: data.instanceUrl,
      accessToken: data.accessToken,
      version: versionInt,
    });
    return conn.tooling.request(`${data.atr}/Body`);
  } catch (err: any) {
    return {
      success: false,
      error: err.message,
    };
  }
};
export default getApexLogBody;
