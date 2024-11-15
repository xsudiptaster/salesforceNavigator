import {
  hasString,
  serverInvokeMethod,
  showNotification,
} from '../../utils/general.util';

export const getObjectList = async (loginInfo: any) => {
  const response = await serverInvokeMethod('describeGlobal', loginInfo, {});
  return response.sobjects
    .filter((object: any) => object.queryable)
    .map((object: any) => {
      return { ...object, value: object.name };
    })
    .sort((a: any, b: any) => (a.label > b.label ? 1 : -1));
};
export const getTreeData = async (objectName: string, loginInfo: any) => {
  const response = await serverInvokeMethod('objectDescribe', loginInfo, {
    objectName,
  });
  const types = new Set(response.fields.map((f: any) => f.type));
  console.log(types);
  return {
    mainTree: response.fields
      .sort((a: any, b: any) => (a.label > b.label ? 1 : -1))
      .map((field: any) => {
        return {
          ...field,
          refAdder: '',
          value: field.name,
          level: 0,
          hasChildren: field.type === 'reference',
          isOpen: false,
        };
      }),
    subTrees: response.childRelationships,
  };
};
const addToNode = (treeData: any[], parentNode: any, nodes: any[]) => {
  let tempTreeData = [...treeData];
  tempTreeData = tempTreeData.map((node) => {
    if (node.value === parentNode.value) {
      return { ...node, children: nodes };
    }
    if (node.children) {
      node.children = addToNode(node.children, parentNode, nodes);
    }
    return node;
  });
  return tempTreeData;
};
export const handleExpandNode = async (
  parentNode: any,
  treeData: any[],
  loginInfo: any,
) => {
  const response = await serverInvokeMethod('objectDescribe', loginInfo, {
    objectName: parentNode.referenceTo[0],
  });
  const fields = response.fields
    .sort((a: any, b: any) => (a.label > b.label ? 1 : -1))
    .map((field: any) => {
      return {
        ...field,
        value:
          parentNode.refAdder !== ''
            ? `${parentNode.refAdder}.${parentNode.relationshipName}.${field.name}`
            : `${parentNode.relationshipName}.${field.name}`,
        refAdder:
          parentNode.refAdder !== ''
            ? `${parentNode.refAdder}.${parentNode.relationshipName}`
            : parentNode.relationshipName,
        level: parentNode.level + 1,
        hasChildren: field.type === 'reference',
        isOpen: false,
      };
    });
  return addToNode(treeData, parentNode, fields);
};
export const generateQuery = (selectedNodes: any, objectName: string) => {
  let q = 'SELECT ';
  const fields = selectedNodes.map((node: any) => {
    return node.value;
  });
  q += `${fields.join(',')} FROM ${objectName}`;
  return q;
};

export const filterTree = (treeData: any[], searchString: string) => {
  const tempTree = [...treeData];
  if (searchString === '') {
    return tempTree;
  }
  return tempTree.filter((node) => {
    if (node.children) {
      node.children = filterTree(node.children, searchString);
    }
    return (
      hasString(node.label, searchString) ||
      hasString(node.name, searchString) ||
      node?.children?.length > 0
    );
  });
};
export const handleUpdate = (
  treeNodes: any[],
  parentNode: any,
  isOpen: boolean,
) => {
  let tempTree = [...treeNodes];
  tempTree = tempTree.map((node) => {
    if (node.value === parentNode) {
      return { ...node, isOpen };
    }
    if (node.children) {
      node.children = handleUpdate(node.children, parentNode, isOpen);
    }
    return node;
  });
  return tempTree;
};
export const getData = async (query: string, loginInfo: any) => {
  const response = await serverInvokeMethod('query', loginInfo, {
    query,
  });
  if (response.records) {
    return response.records;
  }
  showNotification(true, response.errors);
  return [];
};
