import { retrieveApplication } from '@/services/daam/index.server';
import { ExtendedSession, authOptions } from '@/utils/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const session: ExtendedSession | null = await getServerSession(authOptions);
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id')!;

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized: no user session' }, { status: 401 });
  }

  try {
    const application = await retrieveApplication(id, session);
    return application;
    // return NextResponse.json({ success: true, body: { application } }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `Failed to add retrieve the application: ${error}` }, { status: 500 });
  }
}
