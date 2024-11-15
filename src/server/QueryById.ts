import { versionInt } from './config';

const jsforce = require('jsforce');

const recordByIds = async (data: any) => {
  try {
    const conn = new jsforce.Connection({
      instanceUrl: data.instanceUrl,
      accessToken: data.accessToken,
      version: versionInt,
    });
    return await conn.sobject(data.objectName).retrieve(data.recordIds);
  } catch (err: any) {
    return {
      success: false,
      error: err,
    };
  }
};
export default recordByIds;
