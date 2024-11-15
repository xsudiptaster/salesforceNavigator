import versionInt from './config';
const jsforce: any = require('./jsforce.js');

const toolingObjectDescribe = async (data: any) => {
  try {
    const conn = new jsforce.Connection({
      instanceUrl: data.instanceUrl,
      accessToken: data.accessToken,
      version: versionInt,
    });
    const result = await conn.tooling.sobject(data.objectName).describe();
    return result;
  } catch (err: any) {
    return {
      success: false,
      error: err.message,
    };
  }
};
export default toolingObjectDescribe;
