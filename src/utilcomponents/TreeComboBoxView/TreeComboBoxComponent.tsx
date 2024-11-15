import { Combobox, ScrollArea, TextInput, useCombobox } from '@mantine/core';
import React, { useState } from 'react';
import OptionDisplayComponent from './OptionDisplayComponent';
import { sendSelectedValue, setFilterOptions } from './TreeCombo.util';

const TreeComboBoxComponent = ({
  data,
  onExpandClick,
  label,
  placeholder,
  onChange,
}: any) => {
  const combobox = useCombobox();
  const [value, setValue] = useState('');
  const filteredOptions = React.useMemo(() => {
    return setFilterOptions(data, value);
  }, [data, value]);

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        setValue(optionValue);
        const option = sendSelectedValue(data, optionValue);
        onChange(option);
        combobox.closeDropdown();
      }}
      store={combobox}
      size="xs"
    >
      <Combobox.Target>
        <TextInput
          label={label}
          placeholder={placeholder}
          value={value}
          size="xs"
          style={{ width: '300px' }}
          onChange={(event) => {
            setValue(event.currentTarget.value);
            combobox.openDropdown();
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => combobox.closeDropdown()}
        />
      </Combobox.Target>
      <Combobox.Dropdown hidden={data.length === 0}>
        <ScrollArea h={500}>
          <Combobox.Options>
            <OptionDisplayComponent
              options={filteredOptions}
              onExpandClick={onExpandClick}
            />
          </Combobox.Options>
        </ScrollArea>
      </Combobox.Dropdown>
    </Combobox>
  );
};
export default TreeComboBoxComponent;
