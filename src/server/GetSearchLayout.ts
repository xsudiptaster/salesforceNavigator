import { versionInt } from './config';

const jsforce = require('jsforce');

const getSearchLayout = async (data: any) => {
  try {
    const conn: any = new jsforce.Connection({
      instanceUrl: data.instanceUrl,
      accessToken: data.accessToken,
      version: versionInt,
    });
    const oUrl = `/services/data/v${versionInt}/search/layout/?q=${data.objectNames.join(
      ',',
    )}`;
    console.log(oUrl);
    const response = await conn.request(oUrl);
    return response;
  } catch (err: any) {
    return {
      success: false,
      error: err.message,
    };
  }
};
export default getSearchLayout;
