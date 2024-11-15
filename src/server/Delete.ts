import { versionInt } from './config';

const jsforce = require('jsforce');

const deleteMethod = async (data: any) => {
  try {
    const conn = new jsforce.Connection({
      instanceUrl: data.instanceUrl,
      accessToken: data.accessToken,
      version: versionInt,
    });
    const result = await conn.sobject(data.objectName).del(
      data.records.map((oRow: any) => {
        return oRow.Id;
      }),
      { allOrNone: false, allowRecursive: true },
    );
    return result;
  } catch (err: any) {
    return {
      success: false,
      error: err.message,
    };
  }
};
export default deleteMethod;
