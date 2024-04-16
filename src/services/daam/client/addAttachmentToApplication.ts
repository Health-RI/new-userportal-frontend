import { AddedAttachment } from '@/types/application.types';

export async function addAttachmentToApplication(applicationId: number, attachment: FormData): Promise<AddedAttachment> {
  const response = await fetch(`/api/applications/${applicationId}/attachments`, {
    method: 'POST',
    body: attachment,
  });
  return response.json();
}
