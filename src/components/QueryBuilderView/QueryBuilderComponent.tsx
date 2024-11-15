import {
  Button,
  Grid,
  Input,
  ScrollArea,
  Select,
  Stack,
  Textarea,
} from '@mantine/core';
import React from 'react';
import {
  filterTree,
  generateQuery,
  getData,
  getObjectList,
  getTreeData,
  handleExpandNode,
  handleUpdate,
} from './QueryBuilder.util';

import { LoginContext } from '../MainPageView/MainPageComponent';
import { hideLoading, showLoading } from '../../utils/general.util';
import { deduplicateArray } from '../../utils/list.util';
import FilterBuilderComponent from './FilterBuilderComponent';
import DisplayResultTableComponent from './DisplayResultTableComponent';
import TreeNodeComponent from './TreeNodeComponent';

const QueryBuilderComponent = () => {
  const loginInfo = React.useContext(LoginContext);
  const [objectList, setObjectList] = React.useState<any[]>([]);
  const [selectedObject, setSelectedObject] = React.useState('');
  const [mainTreeData, setMainTreeData] = React.useState<any[]>([]);
  const [selectedNodes, setSelectedNodes] = React.useState<any[]>([]);
  const [query, setQuery] = React.useState('');
  const [whereClause, setWhereClause] = React.useState('');
  const [searchString, setSearchString] = React.useState('');
  const [fullQuery, setFullQuery] = React.useState('');
  const [records, setRecords] = React.useState<any[]>([]);
  React.useLayoutEffect(() => {
    const onload = async () => {
      const response = await getObjectList(loginInfo);
      setObjectList(response); // Assuming response is an array of objects with 'label' and 'value' properties.  Replace with actual API call.
    };
    onload();
  }, [loginInfo]);
  const onObjectChange = async (value: string | null) => {
    if (value) {
      const response = await getTreeData(value, loginInfo);
      setMainTreeData(response.mainTree);
      setSelectedObject(value);
    }
  };
  const onExpandClick = async (node: any, isOpen: boolean) => {
    showLoading();
    let tempTreeData = [...mainTreeData];
    if (node.children === undefined) {
      tempTreeData = await handleExpandNode(node, mainTreeData, loginInfo);
    }
    tempTreeData = handleUpdate(tempTreeData, node, isOpen);
    setMainTreeData(tempTreeData);
    hideLoading();
  };
  const onSelectNode = (node: any) => {
    let tempNodes: any[] = [...selectedNodes];
    tempNodes.push(node);
    tempNodes = deduplicateArray(tempNodes, 'value');
    const queryStr = generateQuery(tempNodes, selectedObject);
    setQuery(queryStr);
    setFullQuery(`${queryStr} ${whereClause}`);
    setSelectedNodes(tempNodes);
  };
  const onDeSelectNode = (node: any) => {
    let tempNodes: any[] = [...selectedNodes];
    tempNodes = tempNodes.filter((n) => n.value !== node.value);
    const queryStr = generateQuery(tempNodes, selectedObject);
    setQuery(queryStr);
    setFullQuery(`${queryStr} ${whereClause}`);
    setSelectedNodes(tempNodes);
  };
  const onWhereClauseChange = (value: string) => {
    setWhereClause(value);
    setFullQuery(`${query} ${value}`);
  };
  const onExecute = async () => {
    showLoading();
    const response = await getData(fullQuery, loginInfo);
    setRecords(response);
    console.log(response);
    hideLoading();
  };
  const displayTree = React.useMemo(() => {
    if (searchString === '') {
      return mainTreeData;
    }
    return filterTree(mainTreeData, searchString);
  }, [mainTreeData, searchString]);
  return (
    <Grid>
      <Grid.Col span={4}>
        <Stack>
          <Select
            size="xs"
            searchable
            label="Select Your Object"
            data={objectList}
            onChange={(v: any) => onObjectChange(v)}
          />
          <Input
            size="xs"
            placeholder="Search Field"
            onChange={(e) => setSearchString(e.currentTarget.value)}
          />
          <ScrollArea h={1000}>
            <TreeNodeComponent
              data={displayTree}
              onExpandClick={onExpandClick}
              onSelectNode={onSelectNode}
              onDeSelectNode={onDeSelectNode}
            />
          </ScrollArea>
        </Stack>
      </Grid.Col>
      <Grid.Col span={8}>
        <Stack>
          <Textarea
            value={fullQuery}
            onChange={(e) => setFullQuery(e.currentTarget.value)}
          />
          <Button size="xs" onClick={onExecute}>
            Execute Query
          </Button>
          <FilterBuilderComponent
            data={mainTreeData}
            onExpandClick={onExpandClick}
            onWhereClause={(v: string) => onWhereClauseChange(v)}
          />
          <DisplayResultTableComponent
            selectedFields={selectedNodes}
            records={records}
          />
        </Stack>
      </Grid.Col>
    </Grid>
  );
};
export default QueryBuilderComponent;
