import { versionInt } from './config';

const jsforce = require('jsforce');

const metadataRead = async (data: any) => {
  try {
    const conn = new jsforce.Connection({
      instanceUrl: data.instanceUrl,
      accessToken: data.accessToken,
      version: versionInt,
    });
    const result = await conn.metadata.read(data.objectName, data.types);
    return result;
  } catch (err: any) {
    return {
      success: false,
      error: err.message,
    };
  }
};
export default metadataRead;
