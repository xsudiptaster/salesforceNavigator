import { Checkbox, Input, Select } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import RenderIf from '../../utilcomponents/RenderIf';

const ValueSelectorComponent = ({ field, onChange }: any) => {
  return (
    <>
      <RenderIf rIf={field.type === 'picklist'}>
        <Select data={field.picklistValues} size="xs" onChange={onChange} />
      </RenderIf>
      <RenderIf rIf={field.type === 'multipicklist'}>
        <Select
          data={field.picklistValues}
          size="xs"
          multiple
          onChange={onChange}
        />
      </RenderIf>
      <RenderIf
        rIf={
          field.type === 'string' ||
          field.type === 'id' ||
          field.type === 'reference'
        }
      >
        <Input
          size="xs"
          onChange={(e: any) => onChange(e.currentTarget.value)}
        />
      </RenderIf>
      <RenderIf
        rIf={
          field.type === 'double' ||
          field.type === 'int' ||
          field.type === 'percent' ||
          field.type === 'currency' ||
          field.type === 'url' ||
          field.type === 'email'
        }
      >
        <Input
          size="xs"
          type="number"
          onChange={(e: any) => onChange(e.currentTarget.value)}
        />
      </RenderIf>
      <RenderIf rIf={field.type === 'boolean'}>
        <Checkbox
          size="xs"
          onChange={(e: any) => onChange(e.currentTarget.checked)}
        />
      </RenderIf>
      <RenderIf rIf={field.type === 'date'}>
        <Input
          size="xs"
          type="date"
          onChange={(e: any) => onChange(e.currentTarget.value)}
        />
      </RenderIf>
      <RenderIf rIf={field.type === 'datetime'}>
        <DateTimePicker
          placeholder="Pick date and time"
          onChange={(v: any) => onChange(v)}
        />
      </RenderIf>
    </>
  );
};
export default ValueSelectorComponent;
