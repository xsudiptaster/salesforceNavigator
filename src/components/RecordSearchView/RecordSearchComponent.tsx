import { ActionIcon, Group, Input, Stack, Tabs } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import React from 'react';
import { LoginContext } from '../MainPageView/MainPageComponent';
import { handleSearch } from './RecordSearch.util';
import DisplaySearchResultsComponent from './DisplaySearchResultsComponent';
import EachElement from '../../utilcomponents/EachElement/EachElement';
import DisplayRecordComponent from './DisplayRecordComponent';
import { handleRecordsDisplayList } from './RecordDetails.util';

const RecordSearchComponent = () => {
  const loginInfo = React.useContext(LoginContext);
  const [searchString, setSearchString] = React.useState('');
  const [recordDetails, setRecordDetails] = React.useState<any[]>([]);
  const [resultMap, setResultMap] = React.useState({});
  const [objectList, setObjectList] = React.useState<any[]>([]);
  const onSearch = async () => {
    const response = await handleSearch(searchString, loginInfo);
    if (response.recordId) {
      const tempRecordDetails = await handleRecordsDisplayList(
        response.recordId,
        recordDetails,
        response.objectList,
        loginInfo,
      );
      setRecordDetails(tempRecordDetails);
    } else {
      setResultMap(response.displayResults);
    }
    if (response.objectList) {
      setObjectList(response.objectList);
    }
  };
  const onClick = async (recordId: string) => {
    const tempRecordDetails = await handleRecordsDisplayList(
      recordId,
      recordDetails,
      objectList,
      loginInfo,
    );
    setRecordDetails(tempRecordDetails);
  };
  const onRemove = (recordId: string) => {
    let tempRecordDetails = [...recordDetails];
    tempRecordDetails = tempRecordDetails.filter(
      (rd: any) => rd.recordId !== recordId,
    );
    setRecordDetails(tempRecordDetails);
  };
  return (
    <Stack>
      <Group gap={0}>
        <Input
          placeholder="Enter Record Id"
          size="xs"
          style={{ width: '200px' }}
          onChange={(e: any) => setSearchString(e.currentTarget.value)}
        />
        <ActionIcon variant="subtle" onClick={onSearch}>
          <IconSearch />
        </ActionIcon>
      </Group>
      <Tabs defaultValue="resultMap">
        <Tabs.List>
          <Tabs.Tab value="resultMap">Results</Tabs.Tab>
          <EachElement
            of={recordDetails}
            render={(rd: any) => {
              return (
                <Tabs.Tab value={rd.recordId}>
                  <Group>
                    {rd.displayValue}
                    <div
                      className="button"
                      onClick={() => onRemove(rd.recordId)}
                    >
                      <div className="button-text">x</div>
                    </div>
                  </Group>
                </Tabs.Tab>
              );
            }}
          />
        </Tabs.List>
        <Tabs.Panel value="resultMap">
          <DisplaySearchResultsComponent
            resultMap={resultMap}
            onClick={onClick}
          />
        </Tabs.Panel>
        <EachElement
          of={recordDetails}
          render={(rd: any) => {
            return (
              <Tabs.Panel value={rd.recordId}>
                <DisplayRecordComponent recordDetails={rd} onClick={onClick} />
              </Tabs.Panel>
            );
          }}
        />
      </Tabs>
    </Stack>
  );
};
export default RecordSearchComponent;
