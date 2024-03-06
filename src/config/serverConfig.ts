// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

interface ServerConfig {
  ckanUrl: string;
}

function getEnvVariable(key: string, defaultValue: string): string {
  return process.env[key] || defaultValue;
}

const serverConfig: ServerConfig = {
  ckanUrl: getEnvVariable('CKAN_URL', 'https://ckan-test.healthdata.nl'),
};

export default serverConfig;
