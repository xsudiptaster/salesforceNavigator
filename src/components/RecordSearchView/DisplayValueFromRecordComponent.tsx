import { Checkbox, Input, NumberInput, Select, Textarea } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import React from 'react';
import RenderIf from '../../utilcomponents/RenderIf';
import { deduplicateArray } from '../../utils/list.util';

const DisplayValueFromRecordComponent = (props: any) => {
  const { isEdit, value, setTempRecord, tempRecord, field } = props;
  const isDisabled = React.useMemo(() => {
    return !(isEdit && field.updateable);
  }, [field.updateable, isEdit]);
  const onChange = (val: any) => {
    const oRecord = { ...tempRecord };
    oRecord[field.name] = val;
    setTempRecord(oRecord);
  };
  return (
    <>
      <RenderIf
        rIf={
          field.type === 'string' ||
          field.type === 'reference' ||
          field.type === 'currency' ||
          field.type === 'id' ||
          field.type === 'url'
        }
      >
        <Input
          defaultValue={value}
          disabled={isDisabled}
          size="xs"
          onChange={(e) => onChange(e.currentTarget.value)}
        />
      </RenderIf>
      <RenderIf rIf={field.type === 'textarea'}>
        <Textarea
          defaultValue={value}
          disabled={isDisabled}
          size="xs"
          onChange={(e) => onChange(e.currentTarget.value)}
        />
      </RenderIf>
      <RenderIf rIf={field.type === 'picklist'}>
        <Select
          defaultValue={value}
          data={deduplicateArray(field.picklistValues, 'value')}
          disabled={isDisabled}
          size="xs"
          onChange={(e) => onChange(e)}
        />
      </RenderIf>
      <RenderIf rIf={field.type === 'multipicklist'}>
        <Select
          multiple
          defaultValue={value ? value.toString().split(';') : ''}
          data={deduplicateArray(field.picklistValues, 'value')}
          disabled={isDisabled}
          size="xs"
          onChange={(e) => onChange(e)}
        />
      </RenderIf>
      <RenderIf rIf={field.type === 'boolean'}>
        <Checkbox
          defaultChecked={value}
          disabled={isDisabled}
          size="xs"
          onChange={(e) => onChange(e.currentTarget.checked)}
        />
      </RenderIf>
      <RenderIf
        rIf={
          field.type === 'double' ||
          field.type === 'percent' ||
          field.type === 'int'
        }
      >
        <NumberInput
          defaultValue={value}
          disabled={isDisabled}
          size="xs"
          onChange={(e) => onChange(e)}
        />
      </RenderIf>
      <RenderIf rIf={field.type === 'date' || field.type === 'datetime'}>
        <DateInput
          defaultValue={new Date(value)}
          disabled={isDisabled}
          size="xs"
          onChange={(e) => onChange(e)}
        />
      </RenderIf>
    </>
  );
};
export default DisplayValueFromRecordComponent;
