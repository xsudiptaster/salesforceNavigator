import { versionInt } from './config';

const jsforce = require('jsforce');

const metadataUpdate = async (data: any) => {
  try {
    const conn = new jsforce.Connection({
      instanceUrl: data.instanceUrl,
      accessToken: data.accessToken,
      version: versionInt,
    });
    const result = await conn.metadata.update(data.metadataType, data.records);
    return result;
  } catch (err: any) {
    return {
      success: false,
      error: err.message,
    };
  }
};
export default metadataUpdate;
