import { BrowserWindow } from 'electron';
import { CALLBACK, CLIENT_ID } from './config';

const parseHash = (fragment: any) => {
  const map: any = {};
  const strhash = decodeURIComponent(fragment.substring(1));
  const hashes = strhash.split('&');
  for (let i = 0; i < hashes.length; i += 1) {
    const [keyVal1, keyVal2] = hashes[i].split('=');
    map[keyVal1] = keyVal2;
  }
  return map;
};
let authWindow: any = null;
const startService = async ({ instance, state }: any, mainWindow: any) => {
  authWindow = null;
  authWindow = new BrowserWindow({
    title: 'Login Page',
    alwaysOnTop: true, // keeps this window on top of others
    webPreferences: {
      nodeIntegration: false, // again, don't need to specify these if Electron v4+ but showing for demo
      contextIsolation: true, // we can isolate this window
    },
  });
  const url = `${instance}/services/oauth2/authorize?state=${state || 'initial'}&client_id=${
    CLIENT_ID
  }&redirect_uri=${CALLBACK}&response_type=token`;
  authWindow.loadURL(url);
  authWindow.webContents.on('will-navigate', (details: any) => {
    const oUrl = new URL(details.url);
    if (oUrl.origin === 'http://localhost') {
      const sessionInfo = parseHash(oUrl.hash);
      mainWindow.webContents.send('login-message', sessionInfo);
      authWindow.close();
      authWindow = null;
    }
  });
  authWindow.on('closed', () => {
    authWindow = null;
  });
};

export default startService;
