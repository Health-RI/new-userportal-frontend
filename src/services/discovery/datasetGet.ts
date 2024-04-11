// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import axios from 'axios';
import { RetrievedDataset } from './types/dataset.types';
import { ExtendedSession } from '@/utils/auth';
import { decrypt } from '@/utils/encryption';

export const makeDatasetGet = (ddsUrl: string) => {
  return async (id: string, session?: ExtendedSession): Promise<RetrievedDataset> => {
    const response = await axios.get<RetrievedDataset>(`${ddsUrl}/api/v1/datasets/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${decrypt(session?.access_token ?? '')}`,
      },
    });
    return response.data;
  };
};
