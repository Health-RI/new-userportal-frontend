import { retrieveApplication } from '@/services/daam/index.server';
import { ExtendedSession, authOptions } from '@/utils/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET(request: Request, params: { params: { id: string } }) {
  const session: ExtendedSession | null = await getServerSession(authOptions);
  const { id } = params.params;

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const application = await retrieveApplication(id, session);
    return NextResponse.json({ success: true, body: application }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `Failed to retrieve the application id ${id}` }, { status: 500 });
  }
}
