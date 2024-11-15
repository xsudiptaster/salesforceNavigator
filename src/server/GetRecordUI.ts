import { versionInt } from './config';

const jsforce = require('jsforce');

const getRecordUI = async (data: any) => {
  try {
    const conn: any = new jsforce.Connection({
      instanceUrl: data.instanceUrl,
      accessToken: data.accessToken,
      version: versionInt,
    });
    let oUrl = `/services/data/v${versionInt}/ui-api/records/batch/${data.recordIds.join(
      ',',
    )}?`;
    if (data.childRelationships) {
      oUrl += `&childRelationships=${data.childRelationships.join(',')}`;
    }
    if (data.layoutTypes) {
      oUrl += `&layoutTypes=${data.layoutTypes.join(',')}`;
    }
    if (data.pageSize) {
      oUrl += `&pageSize=${data.pageSize}`;
    }
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
export default getRecordUI;
