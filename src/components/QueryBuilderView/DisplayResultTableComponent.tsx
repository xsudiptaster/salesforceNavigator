import React from 'react';
import DisplayTableComponent from '../../utilcomponents/DisplayTableView/DisplayTableComponent';

const DisplayResultTableComponent = ({ selectedFields, records }: any) => {
  const columns = React.useMemo(() => {
    return selectedFields.map((field: any) => ({
      label: field.label,
      key: field.value,
    }));
  }, [selectedFields]);
  return <DisplayTableComponent columns={columns} data={records} />;
};
export default DisplayResultTableComponent;
