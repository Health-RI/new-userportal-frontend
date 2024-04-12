// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import axios, { AxiosResponse } from 'axios';
import { decrypt } from '@/utils/encryption';
import { ExtendedSession } from '@/utils/auth';
import { CreateApplicationResponse } from '@/types/application.types';

export const makeCreateApplication = (daamUrl: string) => {
  return async (datasetIds: string[], session: ExtendedSession): Promise<AxiosResponse<CreateApplicationResponse>> => {
    const requestBody = {
      datasetIds: datasetIds,
    };

    return await axios.post(`${daamUrl}/api/v1/applications/create`, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${decrypt(session.access_token)}`,
      },
    });
  };
};
