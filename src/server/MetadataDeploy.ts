import { versionInt } from './config';

const jsforce = require('jsforce');

async function checkDeployStatus(conn: any, id: string) {
  let status = await conn.metadata.checkDeployStatus(id, true);
  if (!status.done) {
    status = await checkDeployStatus(conn, id);
  } else {
    return status;
  }
  return status;
}
const metadataDeploy = async (data: any) => {
  const conn = new jsforce.Connection({
    instanceUrl: data.instanceUrl,
    accessToken: data.accessToken,
    version: versionInt,
  });
  const Options: any = {};
  Options.rollbackOnError = true;
  Options.singlePackage = true;
  Options.allowMissingFiles = true;
  Options.autoUpdatePackage = true;
  Options.checkOnly = data?.checkOnly ? data?.checkOnly : false;
  try {
    const deployRequest = await conn.metadata.deploy(data.zipFile, Options);
    const deployStatus = await checkDeployStatus(conn, deployRequest.id);
    return deployStatus;
  } catch (err: any) {
    const response = {
      success: false,
      message: err.message,
    };
    return response;
  }
};

export default metadataDeploy;
