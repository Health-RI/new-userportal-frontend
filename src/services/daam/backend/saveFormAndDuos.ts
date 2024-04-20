// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { SaveDUOCode, SaveForm } from '@/types/application.types';
import { ExtendedSession } from '@/utils/auth';
import { decrypt } from '@/utils/encryption';
import axios, { AxiosResponse } from 'axios';

export function makeSaveFormsAndDuos(daamUrl: string) {
  return async (
    applicationId: string,
    forms: SaveForm[],
    duoCodes: SaveDUOCode[],
    session: ExtendedSession,
  ): Promise<AxiosResponse<void>> => {
    const requestBody = {
      forms: forms,
      duoCodes: duoCodes,
    };
    return axios.post(`${daamUrl}/api/v1/applications/${applicationId}/save-forms-and-duos`, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${decrypt(session.access_token)}`,
      },
    });
  };
}
