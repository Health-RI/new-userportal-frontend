// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

if (typeof window !== 'undefined') {
  throw new Error('This module is intended for server-side use only and should not be included in client-side components.');
}

import { makeCreateApplication } from './backend/createApplication';
import serverConfig from '../../config/serverConfig';
import { makeListApplications } from './backend/listApplications';

const createApplication = makeCreateApplication(serverConfig.daamUrl);
const listApplications = makeListApplications(serverConfig.daamUrl);

export { createApplication, listApplications };
