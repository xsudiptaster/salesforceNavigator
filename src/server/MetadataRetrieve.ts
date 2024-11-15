import { versionInt } from './config';

const jsforce = require('jsforce');

const checkRetrieveStatus = async (conn: any, retrieveId: string) => {
  try {
    let result = await conn.metadata.checkRetrieveStatus(retrieveId);
    if (result.done.toString() !== 'true') {
      result = await checkRetrieveStatus(conn, retrieveId);
    }
    return result;
  } catch (err: any) {
    return {
      success: false,
      error: err.message,
    };
  }
};
const metadataRetrieve = async (data: any) => {
  try {
    const conn = new jsforce.Connection({
      instanceUrl: data.instanceUrl,
      accessToken: data.accessToken,
      version: versionInt,
    });
    if (data.packageNames) {
      const result = await conn.metadata.retrieve({
        packageNames: data.packageNames,
        apiVersion: versionInt,
      });

      const response = await checkRetrieveStatus(conn, result.id);
      return response;
    }
    const result = await conn.metadata.retrieve({
      singlePackage: true,
      unpackaged: {
        types: data.types,
        version: versionInt,
      },
      apiVersion: versionInt,
    });
    const response = await checkRetrieveStatus(conn, result.id);
    return response;
  } catch (err: any) {
    return {
      success: false,
      error: err.message,
    };
  }
};
export default metadataRetrieve;
