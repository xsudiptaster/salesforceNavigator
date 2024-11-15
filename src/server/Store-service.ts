const fs = require('fs');
const path = require('path');
const { app } = require('electron');

const configFilePath = path.join(app.getAppPath(), 'config.json');

function loadConfig() {
  if (!fs.existsSync(configFilePath)) {
    fs.writeFileSync(configFilePath, JSON.stringify({}), 'utf8');
  }
  const data = fs.readFileSync(configFilePath, 'utf8');
  return JSON.parse(data);
}

const getKey = (key: string) => {
  const config = loadConfig();
  return config[key] ? config[key] : [];
};
// Save the config file
const saveConfig = (config: any) => {
  fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2), 'utf8');
  return loadConfig();
};

// Create or update the config file with user-provided JSON
const createConfig = (userConfig: any) => {
  const config = loadConfig();
  Object.assign(config, userConfig);
  saveConfig(config);
  return loadConfig();
};

// Modify a specific key in the config
const modifyKey = (key: string, value: any) => {
  const config = loadConfig();
  config[key] = value;
  saveConfig(config);
  return getKey(key);
};

// Delete a specific key from the config
const deleteKey = (key: string) => {
  const config = loadConfig();
  delete config[key];
  saveConfig(config);
  return getKey(key);
};

// Get the current config
const getConfig = () => {
  return loadConfig();
};
const routeStoreMethods = ({ method, data }: any) => {
  switch (method) {
    case 'delete-table':
      return deleteKey(data.tableName);
    case 'get-table':
      return getKey(data.tableName);
    case 'set-table':
      return modifyKey(data.tableName, data.value);
    case 'set-tables':
      return createConfig(data);
    case 'get-tables':
      return getConfig();
    default:
      return {};
  }
};
export default routeStoreMethods;
