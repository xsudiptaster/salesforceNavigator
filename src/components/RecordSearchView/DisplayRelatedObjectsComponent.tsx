import {
  Accordion,
  Button,
  Card,
  Center,
  Checkbox,
  ScrollArea,
  Stack,
  Text,
} from '@mantine/core';
import React from 'react';
import EachElement from '../../utilcomponents/EachElement/EachElement';
import { LoginContext } from '../MainPageView/MainPageComponent';
import getChildRecords from './RelatedRecords.util';
import DisplayTableForSearchResult from './DisplayTableForSearchResult';
import RenderIf from '../../utilcomponents/RenderIf';

const DisplayChildRecord = (props: any) => {
  const loginInfo: any = React.useContext(LoginContext);
  const { childObject, parentRecordId, onClick } = props;
  const [results, setResults] = React.useState([]);
  const [hasRecords, setHasRecords] = React.useState(false);
  React.useLayoutEffect(() => {
    const onload = async () => {
      const response = await getChildRecords(
        childObject,
        parentRecordId,
        loginInfo,
      );
      if (response.success) {
        setResults(response.results);
        setHasRecords(true);
      } else {
        setHasRecords(false);
      }
    };
    onload();
  }, [childObject, loginInfo, parentRecordId]);
  const onNew = () => {
    const oUrl = `${loginInfo.instanceUrl}/lightning/o/${
      childObject.childSObject
    }/new?nooverride=1&useRecordTypeCheck=1&defaultFieldValues=${childObject.field}=${parentRecordId}`;
    window.open(oUrl, '_blank');
  };
  return (
    <RenderIf rIf={hasRecords}>
      <Accordion.Item
        key={childObject.relationshipName}
        value={childObject.relationshipName}
      >
        <Accordion.Control>
          <div className="parent">
            <div className="left">{childObject.relationshipName}</div>
            <div className="center">{childObject.childSObject}</div>
            <div className="right">{childObject.field}</div>
          </div>
        </Accordion.Control>
        <Accordion.Panel>
          <Button fullWidth size="xs" variant="subtle" onClick={onNew}>
            New
          </Button>
          <DisplayTableForSearchResult records={results} onClick={onClick} />
        </Accordion.Panel>
      </Accordion.Item>
    </RenderIf>
  );
};
const DisplayRelatedObjectsComponent = (props: any) => {
  const { childRelations, parentRecordId, onClick } = props;
  const [displayAll, setDisplayAll] = React.useState(false);
  return (
    <Card withBorder padding="xs">
      <Center>
        <Stack>
          <Text>Related Objects</Text>
          <Checkbox
            variant="filled"
            label="Display All Records"
            checked={displayAll}
            onChange={(e) => setDisplayAll(e.currentTarget.checked)}
          />
        </Stack>
      </Center>
      <ScrollArea h={1000}>
        <Accordion multiple>
          <EachElement
            of={childRelations}
            render={(child: any) => {
              return (
                <DisplayChildRecord
                  childObject={child}
                  parentRecordId={parentRecordId}
                  onClick={onClick}
                />
              );
            }}
          />
        </Accordion>
      </ScrollArea>
    </Card>
  );
};
export default DisplayRelatedObjectsComponent;
