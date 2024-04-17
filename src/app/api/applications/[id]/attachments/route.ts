// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { addAttachmentToApplication } from '@/services/daam/index.server';
import { ExtendedSession, authOptions } from '@/utils/auth';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request, params: { params: { id: string } }) {
  const session: ExtendedSession | null = await getServerSession(authOptions);
  const { id: applicationId } = params.params;

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();

  if (!formData.has('file')) {
    return NextResponse.json({ error: 'Form data does not contain any file' }, { status: 400 });
  }

  try {
    const { id } = await addAttachmentToApplication(applicationId, formData, session);
    return NextResponse.json({ success: true, body: { id } }, { status: 200 });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json({ error: error.response?.data }, { status: error.response?.status });
    } else if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
