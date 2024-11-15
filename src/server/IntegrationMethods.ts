import apexCode from './ApexCode';
import describeGlobal from './DescribeGlobal';
import identity from './Identity';
import login from './Login';
import metadataDeploy from './MetadataDeploy';
import metadataDescribe from './MetadataDescribe';
import metadataList from './MetadataList';
import metadataRead from './MetadataRead';
import metadataRetrieve from './MetadataRetrieve';
import metadataUpdate from './MetadataUpdate';
import objectDescribe from './ObjectDescribe';
import query from './Query';
import refreshToken from './RefreshToken';
import reportTypeList from './ReportTypeList';
import toolingQuery from './ToolingQuery';
import search from './Search';
import recordByIds from './QueryById';
import update from './Update';
import deleteMethod from './Delete';
import getRecordUI from './GetRecordUI';
import getSearchLayout from './GetSearchLayout';
import isSessionTokenActive from './IsSessionActive';

const routeServerMethods = async ({ method, data }: any) => {
  switch (method) {
    case 'login':
      return login(data);
    case 'identity':
      return identity(data);
    case 'refreshToken':
      return refreshToken(data);
    case 'metadataDescribe':
      return metadataDescribe(data);
    case 'metadataList':
      return metadataList(data);
    case 'metadataRetrieve':
      return metadataRetrieve(data);
    case 'metadataDeploy':
      return metadataDeploy(data);
    case 'metadataRead':
      return metadataRead(data);
    case 'metadataUpdate':
      return metadataUpdate(data);
    case 'apexCode':
      return apexCode(data);
    case 'query':
      return query(data);
    case 'describeGlobal':
      return describeGlobal(data);
    case 'objectDescribe':
      return objectDescribe(data);
    case 'toolingQuery':
      return toolingQuery(data);
    case 'reportTypeList':
      return reportTypeList(data);
    case 'search':
      return search(data);
    case 'recordByIds':
      return recordByIds(data);
    case 'update':
      return update(data);
    case 'deleteMethod':
      return deleteMethod(data);
    case 'getRecordUI':
      return getRecordUI(data);
    case 'getSearchLayout':
      return getSearchLayout(data);
    case 'isSessionTokenActive':
      return isSessionTokenActive(data);
    default:
      return { success: false };
  }
};
export default routeServerMethods;
