import { ExtendedSession } from '@/app/api/auth/auth.types';
import { Entitlement } from '@/types/entitlements.types';
import { decrypt } from '@/utils/encryption';
import axios, { AxiosResponse } from 'axios';

export function makeRetrieveEntitlements(daamUrl: string) {
  return async (session: ExtendedSession): Promise<AxiosResponse<Entitlement[]>> => {
    return await axios.get(`${daamUrl}/api/v1/entitlements`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${decrypt(session.access_token)}`,
      },
    });
  };
}
