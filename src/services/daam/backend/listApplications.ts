// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { Application } from '@/types/application.types';
import { ExtendedSession } from '@/utils/auth';
import { decrypt } from '@/utils/encryption';
import axios from 'axios';

export const makeListApplications = (daamUrl: string) => {
return async (session: ExtendedSession): Promise<Application[]> => {
    return await axios.get(`${daamUrl}/api/v1/applications`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${decrypt(session.access_token)}`,
      },
    });
}};
