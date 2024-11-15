import versionInt from './config';

const getDatasetXMD = async (data: any) => {
  try {
    const response = await fetch(
      `${data.instanceUrl}/services/data/${versionInt}/wave/datasets/${data.datasetId}/versions/${data.versionId}/xmds/main`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.accessToken}`,
        },
      }
    );
    const result = await response.json();
    return result;
  } catch (err: any) {
    return {
      success: false,
      error: err.message,
    };
  }
};

export default getDatasetXMD;
