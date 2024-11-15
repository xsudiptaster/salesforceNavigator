import {
  ActionIcon,
  Button,
  Center,
  Group,
  Input,
  Pagination,
  Popover,
  Select,
  Table,
} from '@mantine/core';
import React from 'react';
import { IconFilter, IconFilterFilled } from '@tabler/icons-react';
import EachElement from '../EachElement/EachElement';
import { chunkArray, moveItem } from '../../utils/list.util';
import RenderIf from '../RenderIf';
import { getSearchFilter, getValue } from './DisplayTable.util';
import { writeFileWithXLSX } from '../../utils/file.util';
import { flattenObject } from '../../utils/general.util';

const DisplayTableComponent = ({ columns, data }: any) => {
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(30);
  const [searchStringMap, setSearchStringMap] = React.useState<any>({});
  const [sortedColumns, setSortedColumns] = React.useState([...columns]);
  const [colIndex, setColIndex] = React.useState(0);
  React.useMemo(() => {
    setSortedColumns(columns);
  }, [columns]);
  const displayData: any[] = React.useMemo(() => {
    const tempData = getSearchFilter(data, searchStringMap);
    const chunks = chunkArray(tempData, rowsPerPage);
    setTotal(chunks.length);
    return chunks[page - 1];
  }, [data, page, rowsPerPage, searchStringMap]);
  const onSearchStringChange = (key: string, value: string) => {
    const tempSearchStringMap = { ...searchStringMap };
    if (value !== null && value !== '') {
      tempSearchStringMap[key] = value;
    } else if (tempSearchStringMap[key]) {
      delete tempSearchStringMap[key];
    }
    setSearchStringMap(tempSearchStringMap);
  };
  const onDropHandler = (index: number) => {
    console.log(index);
    let tempColumns = [...sortedColumns];
    tempColumns = moveItem(tempColumns, colIndex, index);
    setSortedColumns(tempColumns);
  };
  const onDownload = () => {
    const response = displayData.map((row: any) => {
      return flattenObject(row);
    });
    writeFileWithXLSX(response, 'queryDownload.xlsx');
  };
  return (
    <>
      <RenderIf rIf={data.length > 0}>
        <Table
          highlightOnHover
          horizontalSpacing="compact-xs"
          stickyHeader
          striped
          verticalSpacing="compact-xs"
          withRowBorders
          withTableBorder
        >
          <Table.Thead>
            <Table.Tr>
              <EachElement
                of={sortedColumns}
                render={(col: any, index: number) => {
                  return (
                    <Table.Th>
                      <div
                        draggable
                        onDragStart={() => setColIndex(index)}
                        onDragEnd={() => setColIndex(0)}
                        onDrop={() => onDropHandler(index)}
                        className="movable"
                        onDragEnter={(e) => e.preventDefault()}
                        onDragOver={(e) => e.preventDefault()}
                      >
                        <Group grow>
                          {col.label}
                          <Popover
                            width={200}
                            position="bottom"
                            withArrow
                            shadow="md"
                          >
                            <Popover.Target>
                              <ActionIcon size="compact-xs" variant="subtle">
                                <RenderIf rIf={searchStringMap[col.key]}>
                                  <IconFilterFilled />
                                </RenderIf>
                                <RenderIf
                                  rIf={searchStringMap[col.key] === undefined}
                                >
                                  <IconFilter />
                                </RenderIf>
                              </ActionIcon>
                            </Popover.Target>
                            <Popover.Dropdown>
                              <Input
                                size="compact-xs"
                                variant="filled"
                                defaultValue={searchStringMap[col.key]}
                                placeholder="search string"
                                onChange={(e) =>
                                  onSearchStringChange(
                                    col.key,
                                    e.currentTarget.value,
                                  )
                                }
                              />
                            </Popover.Dropdown>
                          </Popover>
                        </Group>
                      </div>
                    </Table.Th>
                  );
                }}
              />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <EachElement
              of={displayData}
              render={(record: any) => {
                return (
                  <Table.Tr>
                    <EachElement
                      of={sortedColumns}
                      render={(col: any) => {
                        return <Table.Td>{getValue(col.key, record)}</Table.Td>;
                      }}
                    />
                  </Table.Tr>
                );
              }}
            />
          </Table.Tbody>
        </Table>
        <Group grow justify="space-between">
          <Select
            data={['10', '20', '30', '40', '50', '100']}
            size="xs"
            defaultValue="20"
            style={{ maxWidth: '100px' }}
            onChange={(v: any) => setRowsPerPage(Number(v))}
          />
          <Pagination
            total={total}
            size="xs"
            radius="xl"
            withEdges
            onChange={(v) => setPage(v)}
          />
          <Button variant="subtle" onClick={onDownload}>
            Download
          </Button>
        </Group>
      </RenderIf>
      <RenderIf rIf={data.length === 0}>
        <Center>NO RECORDS</Center>
      </RenderIf>
    </>
  );
};
export default DisplayTableComponent;
