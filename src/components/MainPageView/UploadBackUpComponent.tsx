import { Button, FileInput, Modal, Stack } from '@mantine/core';
import React from 'react';
import { readFileAsText } from '../../utils/file.util';
import { storeInvokeMethod } from '../../utils/general.util';
import { refreshSavedLogins } from '../../utils/login.util';

const UploadBackUpComponent = (props: any) => {
  const { open, setOpen } = props;
  const [backupFile, setBackupFile] = React.useState();
  const onUpload = async () => {
    if (backupFile) {
      const response: any = await readFileAsText(backupFile);
      await storeInvokeMethod('set-table', {
        tableName: 'Login',
        value: JSON.parse(response),
      });
      await refreshSavedLogins();
      setOpen(false);
    }
  };
  return (
    <Modal
      opened={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <Stack>
        <FileInput
          variant="filled"
          label="Select Import JSON file"
          withAsterisk
          description="Input description"
          placeholder="Input placeholder"
          onChange={(file: any) => {
            if (file) {
              setBackupFile(file);
            }
          }}
        />
        <Button variant="default" onClick={onUpload}>
          Upload
        </Button>
      </Stack>
    </Modal>
  );
};
export default UploadBackUpComponent;
