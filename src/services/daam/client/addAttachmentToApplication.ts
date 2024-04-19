// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { AddedAttachment } from '@/types/application.types';

export async function addAttachmentToApplication(applicationId: number, attachment: FormData): Promise<AddedAttachment> {
  const response = await fetch(`/api/applications/${applicationId}/attachments`, {
    method: 'POST',
    body: attachment,
  });
  return response.json();
}
