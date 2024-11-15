const axios = require('axios');
const fetchPatch = async (payloadData: any) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${payloadData.accessToken}`,
    },
  };
  try {
    const response = await axios.patch(
      payloadData.instanceUrl + payloadData.url,
      payloadData.body,
      config
    );
    return response.data;
  } catch (e) {
    return { success: false, error: JSON.stringify(e) };
  }
};
const fetchPost = async (payloadData: any) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${payloadData.accessToken}`,
    },
  };
  try {
    const response = await axios.post(
      payloadData.instanceUrl + payloadData.url,
      payloadData.body,
      config
    );
    return response.data;
  } catch (e) {
    return { success: false, error: JSON.stringify(e) };
  }
};
const fetchJSON = async (payloadData: any) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${payloadData.accessToken}`,
    },
  };
  try {
    const response = await axios.get(
      payloadData.instanceUrl + payloadData.url,
      config
    );
    return response.data;
  } catch (e) {
    return { success: false, error: JSON.stringify(e) };
  }
};

const fetchDelete = async (payloadData: any) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${payloadData.accessToken}`,
    },
  };
  try {
    await axios.delete(payloadData.instanceUrl + payloadData.url, config);
    return { success: true };
  } catch (e) {
    return { success: false, error: JSON.stringify(e) };
  }
};
const fetchCall = async (payloadData: any) => {
  switch (payloadData.method) {
    case 'patch':
      return fetchPatch(payloadData);
    case 'get':
      return fetchJSON(payloadData);
    case 'post':
      return fetchPost(payloadData);
    case 'delete':
      return fetchDelete(payloadData);
    default:
      return null;
  }
};

export default fetchCall;
