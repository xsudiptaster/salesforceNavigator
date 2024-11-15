import {
  hideLoading,
  serverInvokeMethod,
  showLoading,
} from '../../utils/general.util';

const isValidRecordId = (id: string) => {
  // Regular expression for 15-character and 18-character Salesforce IDs
  const recordIdPattern = /^[a-zA-Z0-9]{15}$|^[a-zA-Z0-9]{18}$/;
  return recordIdPattern.test(id);
};
export const getRecordIdLayout = async (
  recordIds: string[],
  loginInfo: any,
) => {
  const payload = {
    recordIds,
    layoutTypes: ['Compact'],
  };
  const response = await serverInvokeMethod('getRecordUI', loginInfo, payload);
  return response;
};
export const handleSearch = async (searchString: string, loginInfo: any) => {
  showLoading();
  const response = await serverInvokeMethod('describeGlobal', loginInfo, {});
  if (isValidRecordId(searchString)) {
    hideLoading();
    return { recordId: searchString, objectList: response.sobjects };
  }
  const searchResult = await serverInvokeMethod('search', loginInfo, {
    searchString,
  });
  const resultMap = searchResult.searchRecords.reduce(
    (accumulated: any, current: any) => {
      if (accumulated[current.attributes.type.trim()]) {
        accumulated[current.attributes.type.trim()].push(current);
      } else {
        accumulated[current.attributes.type.trim()] = [current];
      }
      return accumulated;
    },
    {},
  );
  const displayResults: any = {};
  for (let i = 0; i < Object.keys(resultMap).length; i += 1) {
    const key = Object.keys(resultMap)[i];
    const resultLayout: any = await getRecordIdLayout(
      resultMap[key].map((r: any) => r.Id),
      loginInfo,
    );
    if (resultLayout.hasErrors === false) {
      displayResults[key] = resultLayout.results;
    } else {
      displayResults[key] = resultMap[key];
    }
  }
  hideLoading();
  return { displayResults, objectList: response.sobjects };
};
