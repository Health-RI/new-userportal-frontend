export async function addAttachmentToApplication(applicationId: string, attachment: FormData): Promise<void> {
  const response = await fetch(`/api/v1/applications/${applicationId}/attachments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: attachment,
  });
  return response.json();
}
