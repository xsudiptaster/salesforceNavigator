import { Accordion, ScrollArea } from '@mantine/core';
import React from 'react';
import EachElement from '../../utilcomponents/EachElement/EachElement';
import DisplayTableForSearchResult from './DisplayTableForSearchResult';

const DisplaySearchResultsComponent = (props: any) => {
  const { resultMap, onClick } = props;
  return (
    <ScrollArea h={1000}>
      <Accordion multiple>
        <EachElement
          of={Object.keys(resultMap)}
          render={(key: string) => {
            return (
              <Accordion.Item key={key} value={key}>
                <Accordion.Control>{key}</Accordion.Control>
                <Accordion.Panel>
                  <DisplayTableForSearchResult
                    records={resultMap[key]}
                    onClick={onClick}
                  />
                </Accordion.Panel>
              </Accordion.Item>
            );
          }}
        />
      </Accordion>
    </ScrollArea>
  );
};
export default DisplaySearchResultsComponent;
