import {
  hideLoading,
  serverInvokeMethod,
  showLoading,
  showNotification,
} from '../../utils/general.util';
import { sortBy } from '../../utils/list.util';

const getRecordDetails = async (
  recordId: string,
  objectList: any[],
  loginInfo: any,
) => {
  const oObject = objectList.find((o) => o.keyPrefix === recordId.substr(0, 3));
  const objectDetails = await serverInvokeMethod(
    'objectDescribe',
    { objectName: oObject.name },
    loginInfo,
  );
  const recordDetails = await serverInvokeMethod(
    'recordByIds',
    {
      objectName: oObject.name,
      recordIds: [recordId],
    },
    loginInfo,
  );
  const childRelations = objectDetails.childRelationships.filter(
    (child: any) =>
      child.childSObject !== null &&
      child.relationshipName !== null &&
      child.field !== null,
  );
  const fields = sortBy(objectDetails.fields, 'label', 'asc');
  const namedField = fields.find((field) => field.nameField);
  return {
    recordId,
    displayValue: recordDetails[0][namedField.name],
    record: recordDetails[0],
    fields,
    object: objectDetails,
    childRelations,
    namedField,
  };
};
export const handleRecordsDisplayList = async (
  recordId: string,
  recordDetailsList: any[],
  objectList: any[],
  loginInfo: any,
) => {
  showLoading();
  let tempRecordDetails = [...recordDetailsList];
  const details = await getRecordDetails(recordId, objectList, loginInfo);
  tempRecordDetails = tempRecordDetails.filter(
    (rd: any) => rd.recordId !== recordId,
  );
  tempRecordDetails.push(details);
  hideLoading();
  return tempRecordDetails;
};

export const handleSave = async (
  oRecord: any,
  objectName: string,
  loginInfo: any,
) => {
  const response = await serverInvokeMethod('update', loginInfo, {
    objectName,
    records: [oRecord],
  });
  if (response[0].success) {
    showNotification(false, 'Record updated successfully');
    return { success: true };
  }
  showNotification(
    true,
    `Failed to update record-${JSON.stringify(response[0].errors)}`,
  );
  return { success: false };
};
export const handleDelete = async (
  recordId: string,
  objectName: string,
  loginInfo: any,
) => {
  const response = await serverInvokeMethod('delete', loginInfo, {
    records: [{ Id: recordId }],
    objectName,
  });
  if (response.success) {
    showNotification(false, 'Record deleted successfully');
    return { success: true };
  }
  showNotification(
    true,
    `Failed to delete record-${JSON.stringify(response.errors)}`,
  );
  return { success: false };
};
export const openInSalesforce = (recordId: any, loginInfo: any) => {
  const oUrl = `${loginInfo.instanceUrl}/${recordId}`;
  window.open(oUrl, '_blank');
};
