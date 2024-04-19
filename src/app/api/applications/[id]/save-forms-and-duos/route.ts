// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { saveFormAndDuos } from '@/services/daam/index.server';
import { ExtendedSession, authOptions } from '@/utils/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request, params: { params: { id: string } }) {
  const session: ExtendedSession | null = await getServerSession(authOptions);
  const { id } = params.params;

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { forms, duosCodes } = await request.json();

  try {
    saveFormAndDuos(id, forms, duosCodes, session);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Something went wrong';

    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
