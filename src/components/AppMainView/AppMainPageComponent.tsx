import { useDisclosure } from '@mantine/hooks';
import { AppShell, NavLink } from '@mantine/core';
import { IconSearch, IconSql } from '@tabler/icons-react';
import React from 'react';
import RenderIf from '../../utilcomponents/RenderIf';
import RecordSearchComponent from '../RecordSearchView/RecordSearchComponent';
import EachElement from '../../utilcomponents/EachElement/EachElement';
import QueryBuilderComponent from '../QueryBuilderView/QueryBuilderComponent';
import { LoginContext } from '../MainPageView/MainPageComponent';
import checkLoginInfo from './AppMain.util';

const navItems = [
  {
    label: 'Search Record',
    key: 'searchRecord',
    icon: <IconSearch stroke={2} />,
  },
  {
    label: 'Query Builder',
    key: 'queryBuilder',
    icon: <IconSql stroke={2} />,
  },
];
const AppMainPageComponent = () => {
  const [opened] = useDisclosure();
  const loginInfo = React.useContext(LoginContext);
  const [selectedApp, setSelectedApp] = React.useState('searchRecord');
  React.useEffect(() => {
    const onload = async () => {
      await checkLoginInfo(loginInfo);
    };
    const intervalId = setInterval(onload, 2 * 60 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [loginInfo]);
  return (
    <AppShell
      header={{ height: 45 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Navbar p="md">
        <EachElement
          of={navItems}
          render={(item: any) => {
            return (
              <NavLink
                href="#required-for-focus"
                label={item.label}
                active={item.key === selectedApp}
                leftSection={item.icon}
                onClick={() => setSelectedApp(item.key)}
              />
            );
          }}
        />
      </AppShell.Navbar>

      <AppShell.Main>
        <RenderIf rIf={selectedApp === 'searchRecord'}>
          <RecordSearchComponent />
        </RenderIf>
        <RenderIf rIf={selectedApp === 'queryBuilder'}>
          <QueryBuilderComponent />
        </RenderIf>
      </AppShell.Main>
    </AppShell>
  );
};
export default AppMainPageComponent;
