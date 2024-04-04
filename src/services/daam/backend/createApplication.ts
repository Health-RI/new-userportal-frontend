// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { ExtendedSession } from '@/utils/auth';
import { decrypt } from '@/utils/encryption';
import axios from 'axios';

export const makeCreateApplication = (daamUrl: string) => {
  return async (datasetIds: string[], session: ExtendedSession): Promise<void> => {
    const requestBody = {
      datasetIds: datasetIds,
    };

    await axios.post(`${daamUrl}/api/v1/applications/create`, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${decrypt(session.access_token)}`,
      },
    });
  };
};
