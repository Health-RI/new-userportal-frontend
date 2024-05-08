// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { handleErrorResponse } from '@/app/api/errorHandling';
import { submitApplication } from '@/services/daam/index.server';
import { ExtendedSession, authOptions } from '@/utils/auth';
import { AxiosResponse } from 'axios';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

interface BackendErrorResponse {
  detail: string;
  errorMessages: string[];
}

export async function POST(request: Request, params: { params: { id: string } }): Promise<Response> {
  const session: ExtendedSession | null = await getServerSession(authOptions);
  const { id } = params.params;

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const response = (await submitApplication(id, session)) as AxiosResponse<BackendErrorResponse>;
    if (response.status !== 200 && response.data) {
      const errorDetail = response.data.detail;
      let errorMessage = errorDetail;

      if (response.data.errorMessages && response.data.errorMessages.length > 0) {
        errorMessage += '\n' + response.data.errorMessages.join('\n');
      }
      return NextResponse.json({ error: errorMessage }, { status: response.status });
    }
    return NextResponse.json({ status: 200 });
  } catch (error) {
    return handleErrorResponse(error);
  }
}
