import { versionInt } from './config';

const jsforce = require('jsforce');

const apexCode = async (data: any) => {
  try {
    const conn = new jsforce.Connection({
      instanceUrl: data.instanceUrl,
      accessToken: data.accessToken,
      version: versionInt,
    });
    return conn.tooling.executeAnonymous(data.code);
  } catch (e: any) {
    return { success: false, error: e };
  }
};
export default apexCode;
