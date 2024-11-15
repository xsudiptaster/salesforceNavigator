import { Button, Center, Modal, Select, Stack } from '@mantine/core';
import React from 'react';
import { deleteLogin } from '../../components/LoginPageView/SavedLoginsView/SavedLoginsView.util';
import { useLoggedInOrgStore } from '../../stores/stores';
import { storeInvokeMethod } from '../../utils/general.util';
import { handleLoginFromSavedOrgs } from '../../utils/login.util';

interface ISelectOrgForExecutionViewProps {
  open: boolean;
  setOpen: any;
  execute: any;
}

const SelectOrgForExecutionView: React.FC<ISelectOrgForExecutionViewProps> = (
  props,
) => {
  const { open, setOpen, execute } = props;
  const loggedInOrg = useLoggedInOrgStore((state: any) => state.loggedInOrg);
  const [orgList, setOrgList] = React.useState([]);
  const [selectedUsername, setSelectedUsername] = React.useState<any>(
    loggedInOrg.username,
  );
  const onClick = async () => {
    if (
      selectedUsername !== undefined &&
      selectedUsername !== null &&
      selectedUsername !== ''
    ) {
      if (selectedUsername === loggedInOrg.username) {
        await execute(loggedInOrg);
      } else {
        const tempOrg = orgList.find(
          (org: any) => org.username === selectedUsername,
        );
        const loginInfo = await handleLoginFromSavedOrgs(tempOrg, true);
        console.log('🚀 ~ onClick ~ loginInfo:', loginInfo);
        if (loginInfo.success) {
          await execute(loginInfo);
          setOpen(false);
        } else {
          deleteLogin(tempOrg);
          const response = await storeInvokeMethod('get-table', {
            tableName: 'Login',
          });
          setOrgList(response);
        }
      }
    }
  };
  React.useEffect(() => {
    const onload = async () => {
      const response = await storeInvokeMethod('get-table', {
        tableName: 'Login',
      });
      setOrgList(response);
    };
    onload();
  }, []);
  return (
    <Modal opened={open} onClose={() => setOpen(false)}>
      <Stack>
        <Select
          label="Select Org"
          placeholder="Pick Username"
          data={orgList.map((org: any) => org.username)}
          required
          value={selectedUsername}
          onChange={(v) => setSelectedUsername(v)}
        />
        <Center>
          <Button size="xs" variant="default" onClick={onClick}>
            Select
          </Button>
        </Center>
      </Stack>
    </Modal>
  );
};

export default SelectOrgForExecutionView;
