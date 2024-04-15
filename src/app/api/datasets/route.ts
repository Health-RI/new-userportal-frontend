// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { datasetList } from '@/services/discovery';
import { ExtendedSession, authOptions } from '@/utils/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const session: ExtendedSession | null = await getServerSession(authOptions);

  try {
    const { options } = await request.json();
    const response = await datasetList(options, session!);

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrive datasets' }, { status: 500 });
  }
}
