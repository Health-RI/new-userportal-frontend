import { AddedAttachment } from '@/types/application.types';
import { ExtendedSession } from '@/utils/auth';
import { decrypt } from '@/utils/encryption';

export function makeAddAttachmentToApplication(daamUrl: string) {
  return async (applicationId: string, attachment: FormData, session: ExtendedSession): Promise<AddedAttachment> => {
    const response = await fetch(`${daamUrl}/api/v1/applications/${applicationId}/attachments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${decrypt(session.access_token)}`,
      },
      body: attachment,
    });
    return response.json();
  };
}
