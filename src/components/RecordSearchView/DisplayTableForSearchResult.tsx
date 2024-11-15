import React from 'react';
import { ActionIcon, Button, Center, Table } from '@mantine/core';
import { IconBrandChrome, IconStackPop } from '@tabler/icons-react';
import EachElement from '../../utilcomponents/EachElement/EachElement';
import RenderIf from '../../utilcomponents/RenderIf';
import { LoginContext } from '../MainPageView/MainPageComponent';
import { openInSalesforce } from './RecordDetails.util';

const DisplayTableForSearchResult = (props: any) => {
  const loginInfo = React.useContext(LoginContext);
  const { records, onClick } = props;
  const columns = React.useMemo(() => {
    if (records[0] && records[0]?.result?.fields) {
      return Object.keys(records[0].result.fields);
    }
    return [];
  }, [records]);
  return (
    <div style={{ maxHeight: '90dvh', overflow: 'auto' }}>
      <Table
        horizontalSpacing="compact-xs"
        verticalSpacing="compact-xs"
        striped
        highlightOnHover
        withTableBorder
        stickyHeader
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>
              <Center>Open Record</Center>
            </Table.Th>
            <EachElement
              of={columns}
              render={(item: string) => {
                return (
                  <Table.Th key={item}>
                    <Center>{item}</Center>
                  </Table.Th>
                );
              }}
            />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <EachElement
            of={records}
            render={(record: any) => {
              return (
                <Table.Tr key={record?.result?.id}>
                  <Table.Td>
                    <ActionIcon
                      variant="subtle"
                      size="compact-xs"
                      onClick={() => onClick(record?.result?.id)}
                    >
                      <IconStackPop />
                    </ActionIcon>
                    <ActionIcon
                      size="compact-xs"
                      variant="subtle"
                      onClick={() =>
                        openInSalesforce(record?.result?.id, loginInfo)
                      }
                    >
                      <IconBrandChrome />
                    </ActionIcon>
                  </Table.Td>
                  <EachElement
                    of={columns}
                    render={(column: string) => {
                      return (
                        <Table.Td key={column}>
                          <RenderIf
                            rIf={
                              record?.result?.fields[column]?.displayValue !==
                              null
                            }
                          >
                            <RenderIf
                              rIf={
                                record?.result?.fields[column]?.value?.id !==
                                undefined
                              }
                            >
                              <Button
                                variant="subtle"
                                onClick={() =>
                                  onClick(
                                    record?.result?.fields[column]?.value?.id,
                                  )
                                }
                              >
                                {record?.result?.fields[column]?.displayValue}
                              </Button>
                            </RenderIf>
                            <RenderIf
                              rIf={
                                record?.result?.fields[column]?.value?.id ===
                                undefined
                              }
                            >
                              {record?.result?.fields[column]?.displayValue}
                            </RenderIf>
                          </RenderIf>
                          <RenderIf
                            rIf={
                              record?.result?.fields[column]?.displayValue ===
                              null
                            }
                          >
                            {record?.result?.fields[column]?.value}
                          </RenderIf>
                        </Table.Td>
                      );
                    }}
                  />
                </Table.Tr>
              );
            }}
          />
        </Table.Tbody>
      </Table>
    </div>
  );
};
export default DisplayTableForSearchResult;
