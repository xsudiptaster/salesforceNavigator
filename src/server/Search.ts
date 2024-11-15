import { versionInt } from './config';

const jsforce = require('jsforce');

const search = async (data: any) => {
  try {
    const conn = new jsforce.Connection({
      instanceUrl: data.instanceUrl,
      accessToken: data.accessToken,
      version: versionInt,
    });
    const result = await conn.request(
      `/services/data/v${versionInt}/search/?q=FIND {*${data.searchString}*}`,
    );
    return result;
  } catch (e) {
    return { success: false, error: e };
  }
};
export default search;
