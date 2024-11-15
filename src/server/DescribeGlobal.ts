import { versionInt } from './config';

const jsforce = require('jsforce');

const describeGlobal = async (data: any) => {
  try {
    const conn = new jsforce.Connection({
      instanceUrl: data.instanceUrl,
      accessToken: data.accessToken,
      version: versionInt,
    });
    return conn.describeGlobal();
  } catch (err: any) {
    return {
      success: false,
      error: err.message,
    };
  }
};
export default describeGlobal;
