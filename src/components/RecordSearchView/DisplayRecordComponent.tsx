import React from 'react';
import {
  Button,
  Group,
  Input,
  ScrollArea,
  SimpleGrid,
  Table,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

import { LoginContext } from '../MainPageView/MainPageComponent';
import EachElement from '../../utilcomponents/EachElement/EachElement';
import RenderIf from '../../utilcomponents/RenderIf';
import DisplayValueFromRecordComponent from './DisplayValueFromRecordComponent';
import { hasString } from '../../utils/general.util';
import DisplayRelatedObjectsComponent from './DisplayRelatedObjectsComponent';
import {
  handleDelete,
  handleSave,
  openInSalesforce,
} from './RecordDetails.util';

const DisplayRecordComponent = (props: any) => {
  const loginInfo = React.useContext(LoginContext);
  const { recordDetails, onClick } = props;
  const [searchString, setSearchString] = React.useState('');
  const [tempRecord, setTempRecord] = React.useState<any>({});
  const [isEdit, setIsEdit] = React.useState(false);
  const displayFields = React.useMemo(() => {
    return recordDetails.fields.filter(
      (f: any) =>
        hasString(f.label, searchString) || hasString(f.name, searchString),
    );
  }, [recordDetails.fields, searchString]);
  const onCancel = () => {
    setTempRecord({});
    setIsEdit(false);
  };
  const onSave = async () => {
    const oRecord: any = { ...tempRecord };
    oRecord.Id = recordDetails.record.Id;
    const response = await handleSave(
      oRecord,
      recordDetails.object.name,
      loginInfo,
    );
    if (response.success) {
      setIsEdit(false);
    }
  };
  const onDelete = async () => {
    const response = await handleDelete(
      recordDetails.record.Id,
      recordDetails.object.name,
      loginInfo,
    );
    if (response.success) {
      onClick();
    }
  };
  return (
    <SimpleGrid cols={2}>
      <div>
        <Group grow>
          <Input
            placeholder="Search Field"
            size="xs"
            rightSection={<IconSearch />}
            style={{ width: '200px' }}
            onChange={(e: any) => setSearchString(e.currentTarget.value)}
          />
          <>
            <RenderIf rIf={isEdit}>
              <Button size="xs" variant="subtle" onClick={onSave}>
                Save
              </Button>
              <Button size="xs" variant="subtle" onClick={onCancel}>
                Cancel
              </Button>
            </RenderIf>
            <RenderIf rIf={!isEdit}>
              <Button
                size="xs"
                variant="subtle"
                onClick={() => setIsEdit(true)}
              >
                Edit
              </Button>
              <Button size="xs" variant="subtle" onClick={onDelete}>
                Delete
              </Button>
            </RenderIf>
            <Button
              size="xs"
              variant="subtle"
              onClick={() =>
                openInSalesforce(recordDetails.record.id, loginInfo)
              }
            >
              Open In Salesforce
            </Button>
          </>
        </Group>
        <ScrollArea h={1000}>
          <Table
            highlightOnHover
            horizontalSpacing="xs"
            stickyHeader
            verticalSpacing="xs"
            withTableBorder
            captionSide="top"
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Label</Table.Th>
                <Table.Th>API Name</Table.Th>
                <Table.Th>Value</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <EachElement
                of={displayFields}
                render={(field: any) => {
                  return (
                    <Table.Tr>
                      <Table.Td>{field.label}</Table.Td>
                      <Table.Td>{field.name}</Table.Td>
                      <Table.Td>
                        <div
                          style={{
                            backgroundColor:
                              tempRecord[field.name] !== undefined &&
                              tempRecord[field.name] !==
                                recordDetails.record[field.name]
                                ? 'yellow'
                                : '',
                          }}
                        >
                          <DisplayValueFromRecordComponent
                            isEdit={isEdit}
                            value={recordDetails.record[field.name]}
                            field={field}
                            setTempRecord={setTempRecord}
                            tempRecord={tempRecord}
                          />
                        </div>
                      </Table.Td>
                    </Table.Tr>
                  );
                }}
              />
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </div>
      <div>
        <DisplayRelatedObjectsComponent
          childRelations={recordDetails.childRelations}
          parentRecordId={recordDetails.record.Id}
          onClick={onClick}
        />
      </div>
    </SimpleGrid>
  );
};
export default DisplayRecordComponent;
