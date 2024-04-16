// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import axios from 'axios';
import { RetrievedDataset } from '../types/dataset.types';
import { createHeaders } from '../utils';
import { ExtendedSession } from '@/utils/auth';

export const makeDatasetGet = (discoveryUrl: string) => {
  return async (id: string, session?: ExtendedSession): Promise<RetrievedDataset> => {
    const response = await axios.get<RetrievedDataset>(`${discoveryUrl}/api/v1/datasets/${id}`, {
      headers: await createHeaders(session),
    });
    return response.data;
  };
};
