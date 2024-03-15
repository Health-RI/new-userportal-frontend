// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

interface ServerConfig {
  ckanUrl: string;
  daamUrl: string;
}

const serverConfig: ServerConfig = {
  ckanUrl: process.env.NEXT_PUBLIC_CKAN_URL || 'https://ckan-test.healthdata.nl',
  daamUrl: process.env.DAAM_URL || 'http://localhost:8080',
};

export default serverConfig;
