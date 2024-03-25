// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0
import { env } from 'next-runtime-env';

interface ServerConfig {
  ckanUrl: string;
  daamUrl: string;
}

const serverConfig: ServerConfig = {
  ckanUrl: env('NEXT_PUBLIC_CKAN_URL') || 'https://ckan-test.healthdata.nl',
  daamUrl: env('DAAM_URL') || 'http://localhost:8080',
};

export default serverConfig;
