import { ActionIcon, Avatar, Card, Center, Flex, Group } from '@mantine/core';
import { IconBrandChrome, IconLogin, IconTrash } from '@tabler/icons-react';
import React from 'react';
import EachElement from '../../utilcomponents/EachElement/EachElement';
import {
  deleteLogin,
  deleteOpenTabs,
  handleLoginUsingUsernamePassword,
  refreshSavedLogins,
} from '../../utils/login.util';
import { openInChrome } from './MainPage.util';
import { savedOrgStore } from '../../stores/stores';

const DisplaySavedOrgsComponent = () => {
  const savedOrg = savedOrgStore((state: any) => state.savedOrg);
  React.useLayoutEffect(() => {
    const onload = async () => {
      await refreshSavedLogins();
    };
    onload();
  }, []);
  const onDelete = async (sessionInfo: any) => {
    await deleteLogin(sessionInfo);
    await deleteOpenTabs(sessionInfo);
    await refreshSavedLogins();
  };
  const onLogin = async (sessionInfo: any) => {
    await handleLoginUsingUsernamePassword(sessionInfo);
    await refreshSavedLogins();
  };
  const onOpen = async (sessionInfo: any) => {
    await openInChrome(sessionInfo);
  };
  return (
    <div style={{ padding: '30px', alignContent: 'center' }}>
      <Flex
        mih={50}
        gap="xl"
        justify="center"
        align="center"
        direction="row"
        wrap="wrap"
      >
        <EachElement
          of={savedOrg}
          render={(item: any) => {
            return (
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                style={{ maxWidth: '300px' }}
              >
                <Card.Section inheritPadding>
                  <Group justify="space-between" mt="md" mb="xs">
                    <Avatar src={item.picture} />
                    {item.displayName}
                  </Group>
                </Card.Section>
                <Card.Section inheritPadding>{item.username}</Card.Section>
                <Card.Section inheritPadding>
                  <Center>
                    <Group justify="space-between">
                      <ActionIcon
                        variant="subtle"
                        onClick={() => onDelete(item)}
                      >
                        <IconTrash stroke={2} />
                      </ActionIcon>
                      <ActionIcon
                        variant="subtle"
                        onClick={() => onLogin(item)}
                      >
                        <IconLogin stroke={2} />
                      </ActionIcon>
                      <ActionIcon variant="subtle" onClick={() => onOpen(item)}>
                        <IconBrandChrome stroke={2} />
                      </ActionIcon>
                    </Group>
                  </Center>
                </Card.Section>
              </Card>
            );
          }}
        />
      </Flex>
    </div>
  );
};
export default DisplaySavedOrgsComponent;
