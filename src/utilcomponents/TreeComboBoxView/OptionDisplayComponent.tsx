import React from 'react';
import EachElement from '../EachElement/EachElement';
import TreeOptionsComponent from './TreeOptionsComponent';

const OptionDisplayComponent = ({ options, onExpandClick }: any) => {
  return (
    <EachElement
      of={options}
      render={(node: any) => {
        return (
          <TreeOptionsComponent node={node} onExpandClick={onExpandClick} />
        );
      }}
    />
  );
};
export default OptionDisplayComponent;
