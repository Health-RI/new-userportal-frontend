import { submitApplication } from '@/services/daam/index.server';
import { ExtendedSession, authOptions } from '@/utils/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request, params: { params: { id: string } }) {
  const session: ExtendedSession | null = await getServerSession(authOptions);
  const { id } = params.params;

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized: no user session' }, { status: 401 });
  }

  try {
    await submitApplication(id, session);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `Failed to retrieve the application: ${error}` }, { status: 500 });
  }
}
