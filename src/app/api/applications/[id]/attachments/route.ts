// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { addAttachmentToApplication } from '@/services/daam/index.server';
import { ExtendedSession, authOptions } from '@/utils/auth';
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
    return NextResponse.json({ error: `Failed to add attachment to application id ${applicationId}` }, { status: 500 });
  }
}
