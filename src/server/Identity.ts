import { versionInt } from './config';

const jsforce = require('jsforce');

const identity = async (data: any) => {
  try {
    const conn: any = new jsforce.Connection({
      instanceUrl: data.instanceUrl,
      accessToken: data.accessToken,
      version: versionInt,
    });
    const result = await conn.identity();
    return result;
  } catch (err: any) {
    return {
      success: false,
      error: err.message,
    };
  }
};
export default identity;
