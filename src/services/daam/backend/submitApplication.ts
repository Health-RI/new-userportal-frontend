// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { ErrorResponse, ValidationWarnings } from '@/types/api.types';
import { ExtendedSession } from '@/utils/auth';
import { decrypt } from '@/utils/encryption';

export function makeSubmitApplication(daamUrl: string) {
  return async (applicationId: string, session: ExtendedSession): Promise<void | ErrorResponse | ValidationWarnings> => {
    const response = await fetch(`${daamUrl}/api/v1/applications/${applicationId}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${decrypt(session.access_token)}`,
      },
    });
    if (!response.ok) return response.json();
  };
}
