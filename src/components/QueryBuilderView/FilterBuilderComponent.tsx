import {
  Accordion,
  ActionIcon,
  Button,
  Center,
  Grid,
  Group,
  Input,
  Select,
  Stack,
} from '@mantine/core';
import React from 'react';
import { IconFilter, IconTrash } from '@tabler/icons-react';
import EachElement from '../../utilcomponents/EachElement/EachElement';
import TreeComboBoxComponent from '../../utilcomponents/TreeComboBoxView/TreeComboBoxComponent';
import ValueSelectorComponent from './ValueSelectorComponent';
import {
  generateWhereClause,
  getFilterableFields,
  validateConditions,
} from './FilterBuilder.util';

const OperatorOptions = [
  { label: 'Equals', value: '=' },
  { label: 'Not Equals', value: '!=' },
  { label: 'Greater Than', value: '>' },
  { label: 'Less Than', value: '<' },
  { label: 'Less Than Equal', value: '<=' },
  {
    label: 'Greater Than Equal',
    value: '>=',
  },
  { label: 'Contains', value: 'Like' },
];
const FilterBuilderComponent = (props: any) => {
  const { data, onExpandClick, onWhereClause } = props;
  const [listConditions, setListConditions] = React.useState<any[]>([]);
  const [filterLogic, setFilterLogic] = React.useState('');
  const addRow = () => {
    const tempList = [...listConditions];
    tempList.push({ field: '', operator: '=', value: '' });
    setListConditions(tempList);
    setFilterLogic(
      tempList
        .map((c, i) => {
          return i + 1;
        })
        .join(' AND '),
    );
  };
  const onChange = (index: number, value: any) => {
    const tempList = [...listConditions];
    tempList[index].field = value;
    setListConditions(tempList);
  };
  const filterableFields = React.useMemo(() => {
    return getFilterableFields(data);
  }, [data]);
  const onDelete = (index: number) => {
    const tempList = [...listConditions];
    tempList.splice(index, 1);
    setListConditions(tempList);
    setFilterLogic(
      tempList
        .map((c, i) => {
          return i + 1;
        })
        .join(' AND '),
    );
  };
  const onValueChange = (index: number, value: any) => {
    const tempList = [...listConditions];
    tempList[index].value = value;
    setListConditions(tempList);
  };
  const onOperatorChange = (index: number, value: string) => {
    const tempList = [...listConditions];
    tempList[index].operator = value;
    setListConditions(tempList);
  };
  const onAddFilter = () => {
    if (validateConditions(listConditions, filterLogic)) {
      const response = generateWhereClause(listConditions, filterLogic);
      onWhereClause(response);
    }
  };
  return (
    <Accordion variant="contained" radius="lg">
      <Accordion.Item key="filter" value="filter">
        <Accordion.Control icon={<IconFilter stroke={2} />}>
          Filter Logic
        </Accordion.Control>
        <Accordion.Panel>
          <Stack>
            <EachElement
              of={listConditions}
              render={(condition: any, index: number) => {
                return (
                  <Grid style={{ alignItems: 'flex-end' }} justify="flex-end">
                    <Grid.Col span={1}>{index + 1}</Grid.Col>
                    <Grid.Col span={4}>
                      <TreeComboBoxComponent
                        data={filterableFields}
                        onExpandClick={onExpandClick}
                        onChange={(v: any) => onChange(index, v)}
                      />
                    </Grid.Col>
                    <Grid.Col span={2}>
                      <Select
                        data={OperatorOptions}
                        size="xs"
                        defaultValue="="
                        onChange={(v: any) => onOperatorChange(index, v)}
                      />
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Center>
                        <ValueSelectorComponent
                          field={condition.field}
                          onChange={(v: any) => onValueChange(index, v)}
                        />
                      </Center>
                    </Grid.Col>
                    <Grid.Col span={1}>
                      <ActionIcon size="xs" onClick={() => onDelete(index)}>
                        <IconTrash stroke={2} />
                      </ActionIcon>
                    </Grid.Col>
                  </Grid>
                );
              }}
            />
            <Input.Wrapper label="Filter Logic">
              <Input
                size="xs"
                value={filterLogic}
                placeholder="Filter Logic"
                onChange={(e) => setFilterLogic(e.currentTarget.value)}
              />
            </Input.Wrapper>
            <Group grow>
              <Button variant="default" size="xs" onClick={addRow}>
                Add Row
              </Button>
              <Button variant="default" size="xs" onClick={onAddFilter}>
                Add Logic
              </Button>
            </Group>
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};
export default FilterBuilderComponent;
