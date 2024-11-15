import React from 'react';

import { Button, Checkbox, Group, Text, Tooltip } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import RenderIf from '../../utilcomponents/RenderIf';
import EachElement from '../../utilcomponents/EachElement/EachElement';

const TreeNode = ({
  node,
  onExpandClick,
  onSelectNode,
  onDeSelectNode,
}: any) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClick = async () => {
    await onExpandClick(node);
    setIsOpen(!isOpen);
  };
  const onCheckBoxChange = (val: boolean) => {
    if (val) {
      onSelectNode(node);
    } else {
      onDeSelectNode(node);
    }
  };
  return (
    <div style={{ marginLeft: '15px' }}>
      <Tooltip label={node.name}>
        <Group className="treeNode">
          <Checkbox
            size="xs"
            onChange={(e) => onCheckBoxChange(e.currentTarget.checked)}
          />
          <Text>{node.label}</Text>
          <RenderIf rIf={node.type === 'reference'}>
            <Button size="xs" variant="subtle" onClick={onClick}>
              <IconChevronDown
                size={18}
                style={{
                  transform: isOpen ? 'rotate(270deg)' : 'rotate(0deg)',
                }}
              />
            </Button>
          </RenderIf>
        </Group>
      </Tooltip>
      <RenderIf rIf={isOpen}>
        <EachElement
          of={node.children}
          render={(cNode: any) => {
            return (
              <TreeNode
                node={cNode}
                onExpandClick={onExpandClick}
                onSelectNode={onSelectNode}
                onDeSelectNode={onDeSelectNode}
              />
            );
          }}
        />
      </RenderIf>
    </div>
  );
};
const TreeNodeComponent = (props: any) => {
  const { data, onExpandClick, onSelectNode, onDeSelectNode } = props;
  return (
    <EachElement
      of={data}
      render={(node: any) => {
        return (
          <TreeNode
            node={node}
            onExpandClick={onExpandClick}
            onSelectNode={onSelectNode}
            onDeSelectNode={onDeSelectNode}
          />
        );
      }}
    />
  );
};
export default TreeNodeComponent;
