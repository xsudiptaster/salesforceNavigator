import { serverInvokeMethod } from '../../utils/general.util';
import { getRecordIdLayout } from './RecordSearch.util';

const getChildRecords = async (
  childRelation: any,
  parentRecordId: string,
  loginInfo: any,
) => {
  const query = `Select id from ${childRelation.childSObject} where ${
    childRelation.field
  }='${parentRecordId}'`;
  const response = await serverInvokeMethod('query', loginInfo, { query });
  if (response.success && response.records.length > 0) {
    const recordIds = response.records.map((record: any) => record.Id);
    const responseResult = await getRecordIdLayout(recordIds, loginInfo);
    console.log(responseResult);
    return { success: true, results: responseResult.results };
  }
  return { success: false };
};
export default getChildRecords;
