import { RetrievedApplication } from '@/types/application.types';
import { ExtendedSession } from '@/utils/auth';
import { decrypt } from '@/utils/encryption';

export function makeRetrieveApplication(daamUrl: string) {
  return async (applicationId: string, session: ExtendedSession): Promise<RetrievedApplication> => {
    const response = await fetch(`${daamUrl}/api/v1/applications/${applicationId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${decrypt(session.access_token)}`,
      },
    });
    return response.json();
  };
}
