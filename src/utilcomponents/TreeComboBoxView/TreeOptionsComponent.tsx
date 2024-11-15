import { Button, Combobox, Group } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import React from 'react';
import RenderIf from '../RenderIf';
import OptionDisplayComponent from './OptionDisplayComponent';

const TreeOptionsComponent = ({ node, onExpandClick }: any) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClick = async (e: any) => {
    e.stopPropagation();
    await onExpandClick(node);
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Combobox.Option value={node.value} key={node.value}>
        <Group style={{ paddingLeft: node.level * 10 }}>
          {node.label}
          <RenderIf rIf={node.type === 'reference'}>
            <Button size="xs" variant="subtle" onClick={onClick}>
              <IconChevronDown
                size={18}
                style={{
                  transform: !isOpen ? 'rotate(270deg)' : 'rotate(0deg)',
                }}
              />
            </Button>
          </RenderIf>
        </Group>
      </Combobox.Option>
      <RenderIf rIf={node.hasChildren && isOpen}>
        <OptionDisplayComponent
          options={node.children}
          onExpandClick={onExpandClick}
        />
      </RenderIf>
    </>
  );
};
export default TreeOptionsComponent;
