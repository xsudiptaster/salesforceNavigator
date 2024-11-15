import { versionInt } from './config';

const jsforce = require('jsforce');

const reportTypeList = async (data: any) => {
  try {
    const conn = new jsforce.Connection({
      instanceUrl: data.instanceUrl,
      accessToken: data.accessToken,
      version: versionInt,
    });
    const result = await conn.request(
      `/services/data/v${versionInt}/analytics/reportTypes`,
    );
    return result;
  } catch (err: any) {
    return {
      success: false,
      error: err.message,
    };
  }
};

export default reportTypeList;
