import { NavLink, Paper } from '@mantine/core';

import { useClickOutside } from '@mantine/hooks';
import React from 'react';
import EachElement from '../EachElement/EachElement';
import RenderIf from '../RenderIf';
import './styles.css';

const ContextMenuContext = React.createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onContextMenu: (_e: any, _items: any) => {},
});

export const useContextMenu = () => {
  return React.useContext(ContextMenuContext);
};
const ContextMenuProvider: any = (props: any) => {
  const { children } = props;
  const [items, setItems] = React.useState([]);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [open, setOpen] = React.useState(false);
  const onContextMenu = (e: any, array: any) => {
    e.preventDefault();
    e.stopPropagation();
    setItems(array);
    setPosition({ x: e.pageX, y: e.pageY });
    setOpen(true);
  };
  React.useEffect(() => {
    // Close the context menu if clicked outside
    document.addEventListener('click', () => setOpen(false));
    return () => {
      document.removeEventListener('click', () => setOpen(false));
    };
  }, []);
  const ref = useClickOutside(() => setOpen(false));
  const provide = React.useMemo(() => {
    return { onContextMenu };
  }, []);
  return (
    <ContextMenuContext.Provider value={provide}>
      {children}
      <RenderIf rIf={open}>
        <div
          ref={ref}
          className="context-menu"
          style={{ top: `${position.y}px`, left: `${position.x}px` }}
        >
          <Paper>
            <EachElement
              of={items}
              render={(item: any) => {
                return (
                  <NavLink
                    href="#required-for-focus"
                    label={item.label}
                    onClick={item.onClick}
                    leftSection={item?.icon}
                  />
                );
              }}
            />
          </Paper>
        </div>
      </RenderIf>
    </ContextMenuContext.Provider>
  );
};

export default ContextMenuProvider;
