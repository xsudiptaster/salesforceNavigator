import { Avatar, Button, Group, Stack, Tabs } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import React from 'react';
import { IconX } from '@tabler/icons-react';
import LoadingView from '../../utilcomponents/LoadingView';
import '@mantine/notifications/styles.css';
import LoginPageComponent from './LoginPageComponent';
import DisplaySavedOrgsComponent from './DisplaySavedOrgsComponent';
import { deleteOpenTabs, refreshOpenTabs } from '../../utils/login.util';
import EachElement from '../../utilcomponents/EachElement/EachElement';
import { openTabsStore, savedOrgStore } from '../../stores/stores';
import { download } from '../../utils/file.util';
import UploadBackUpComponent from './UploadBackUpComponent';
import AppMainPageComponent from '../AppMainView/AppMainPageComponent';

export const LoginContext = React.createContext({});

const MainPageComponent = () => {
  const [openLogin, setOpenLogin] = React.useState(false);
  const [openUpload, setOpenUpload] = React.useState(false);
  const openTabs = openTabsStore((state: any) => state.openTabs);
  const savedOrg = savedOrgStore((state: any) => state.savedOrg);
  React.useLayoutEffect(() => {
    const onload = async () => {
      await refreshOpenTabs();
    };
    onload();
  }, []);
  const onCloseTab = async (sessionInfo: any) => {
    await deleteOpenTabs(sessionInfo);
    await refreshOpenTabs();
  };
  const onDownload = async () => {
    await download('backup.json', JSON.stringify(savedOrg));
  };
  return (
    <>
      <LoadingView />
      <Notifications />
      <Tabs defaultValue="home">
        <Tabs.List grow>
          <Tabs.Tab value="home">Home</Tabs.Tab>
          <EachElement
            of={openTabs}
            render={(item: any) => {
              return (
                <Tabs.Tab value={item.username}>
                  <Group grow justify="space-between">
                    <div className="parent">
                      <div className="left">
                        <Avatar src={item.picture} size="xs" />
                        {item.username}
                      </div>
                      <div className="right">
                        <div
                          className="button"
                          onClick={() => onCloseTab(item)}
                        >
                          <div className="button-text">
                            <IconX />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Group>
                </Tabs.Tab>
              );
            }}
          />
        </Tabs.List>
        <Tabs.Panel value="home">
          <Stack style={{ paddingTop: '40px' }}>
            <Group grow>
              <Button
                variant="default"
                size="xs"
                onClick={() => {
                  setOpenLogin(true);
                }}
              >
                Add Project
              </Button>
              <Button variant="default" size="xs" onClick={onDownload}>
                Back Up
              </Button>
              <Button
                variant="default"
                size="xs"
                onClick={() => setOpenUpload(true)}
              >
                Import
              </Button>
            </Group>
          </Stack>
          <DisplaySavedOrgsComponent />
          <LoginPageComponent
            setOpenLogin={setOpenLogin}
            openLogin={openLogin}
          />
          <UploadBackUpComponent open={openUpload} setOpen={setOpenUpload} />
        </Tabs.Panel>
        <EachElement
          of={openTabs}
          render={(item: any) => {
            return (
              <Tabs.Panel value={item.username}>
                <LoginContext.Provider value={item}>
                  <AppMainPageComponent />
                </LoginContext.Provider>
              </Tabs.Panel>
            );
          }}
        />
      </Tabs>
    </>
  );
};
export default MainPageComponent;
