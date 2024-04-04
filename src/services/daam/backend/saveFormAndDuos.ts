import { SaveDUOCode, SaveForm } from '@/types/application.types';
import { ExtendedSession } from '@/utils/auth';
import { decrypt } from '@/utils/encryption';

export function makeSaveFormsAndDuos(daamUrl: string) {
  return async (applicationId: string, forms: SaveForm[], duoCodes: SaveDUOCode[], session: ExtendedSession): Promise<void> => {
    const requestBody = {
      forms: forms,
      duoCodes: duoCodes,
    };
    const response = await fetch(`${daamUrl}/api/v1/applications/${applicationId}/save-forms-and-duos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${decrypt(session.access_token)}`,
      },
      body: JSON.stringify(requestBody),
    });
    return response.json();
  };
}
