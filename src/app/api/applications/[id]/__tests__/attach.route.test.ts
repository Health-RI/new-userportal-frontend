// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0
import serverConfig from '@/config/serverConfig';
import { encrypt } from '@/utils/encryption';
import { jest } from '@jest/globals';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { POST } from '../attachments/route';

jest.mock('axios');
jest.mock('next-auth/next');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedGetServerSession = getServerSession as jest.MockedFunction<typeof getServerSession>;

describe('Attach a file to an application', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('returns unauthorized if session is not available', async () => {
    mockedGetServerSession.mockResolvedValueOnce(null);

    const request = new Request('http://localhost', { method: 'POST', body: new FormData() });
    const response = await POST(request, { params: { id: '1' } });

    expect(response.status).toBe(401);
    expect(await response.json()).toEqual({ error: 'Unauthorized' });
  });

  test('successfully attachs file to an application', async () => {
    const encryptedToken = encrypt('decryptedToken');
    mockedGetServerSession.mockResolvedValueOnce({ access_token: encryptedToken });
    mockedAxios.post.mockResolvedValueOnce({ status: 200, data: { id: 10 } });

    const request = new Request('http://localhost', { method: 'POST', body: new FormData() });
    const response = await POST(request, { params: { id: '10' } });

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ id: 10 });
    expect(mockedAxios.post).toHaveBeenCalledWith(`${serverConfig.daamUrl}/api/v1/applications/10/attachments`, new FormData(), {
      headers: {
        Authorization: `Bearer decryptedToken`,
      },
    });
  });

  test('returns error if Axios request fails', async () => {
    const encryptedToken = encrypt('decryptedToken');
    mockedGetServerSession.mockResolvedValueOnce({ access_token: encryptedToken });
    mockedAxios.post.mockRejectedValueOnce(new Error('server error'));

    const request = new Request('http://localhost', { method: 'POST', body: new FormData() });
    const response = await POST(request, { params: { id: '9' } });

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ error: 'server error' });
  });
});
