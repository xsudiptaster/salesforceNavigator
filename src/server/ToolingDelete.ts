import versionInt from './config';
const jsforce: any = require('./jsforce.js');

const toolingDelete = async (data: any) => {
  try {
    const conn = new jsforce.Connection({
      instanceUrl: data.instanceUrl,
      accessToken: data.accessToken,
      version: versionInt,
    });
    const result = await conn.tooling.sobject(data.objectName).delete(data.Ids);

    return result;
  } catch (err: any) {
    return {
      success: false,
      error: err.message,
    };
  }
};
export default toolingDelete;
