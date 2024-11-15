import {
  Button,
  Center,
  Group,
  Modal,
  Paper,
  PasswordInput,
  Stack,
  Switch,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { handleLogin } from './MainPage.util';

const LoginPageComponent = (props: any) => {
  const { setOpenLogin, openLogin } = props;
  const form = useForm({
    initialValues: {
      username: '',
      instance: false,
      password: '',
    },
    validate: {
      username: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) =>
        val.length <= 6
          ? 'Password should include at least 6 characters'
          : null,
    },
  });
  const onLogin = async () => {
    const response = await handleLogin(form.values);
    if (response.success) {
      setOpenLogin(false);
    }
  };
  return (
    <Modal opened={openLogin} onClose={() => {}} withCloseButton={false}>
      <Paper>
        <form
          onSubmit={form.onSubmit(() => {
            onLogin();
          })}
        >
          <Stack>
            <Center>
              <Switch
                onLabel="Production"
                offLabel="Sandbox"
                label={form.values.instance ? 'Production' : 'Sandbox'}
                checked={form.values.instance}
                onChange={(e) =>
                  form.setFieldValue('instance', e.currentTarget.checked)
                }
              />
            </Center>
            <TextInput
              required
              label="Username"
              placeholder="hello@nconsole.dev"
              value={form.values.username}
              onChange={(event) =>
                form.setFieldValue('username', event.currentTarget.value)
              }
              error={form.errors.email && 'Invalid email'}
              radius="md"
            />
            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue('password', event.currentTarget.value)
              }
              error={
                form.errors.password &&
                'Password should include at least 6 characters'
              }
              radius="md"
            />
          </Stack>
          <Group justify="space-between" mt="xl">
            <Button type="submit" radius="xl">
              Login
            </Button>
            <Button
              type="button"
              radius="xl"
              onClick={() => setOpenLogin(false)}
            >
              Cancel
            </Button>
          </Group>
        </form>
      </Paper>
    </Modal>
  );
};
export default LoginPageComponent;
