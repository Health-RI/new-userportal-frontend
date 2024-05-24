// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { Entitlement } from '@/types/entitlements.types';
import axios, { AxiosResponse } from 'axios';

export const retrieveEntitlements = async (): Promise<AxiosResponse<Entitlement[]>> => {
  return await axios.get('/api/entitlements', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
