// SPDX-FileCopyrightText: 2024 PNED G.I.E.
// SPDX-FileContributor: Stichting Health-RI
//
// SPDX-License-Identifier: Apache-2.0
import { jest } from '@jest/globals';
import { makeDatasetCount } from '../datasetCount';

describe('makeDatasetCount', () => {
  const mockFetch = jest.fn<(input: string | Request | URL, init?: RequestInit | undefined) => Promise<Response>>();

  beforeEach(() => {
    mockFetch.mockClear().mockImplementation((url: string | Request | URL) => {
      if (url === 'http://localhost:5500/api/3/action/package_search?rows=0') {
        return Promise.resolve(new Response(JSON.stringify({ result: { count: 100 } })));
      }
      return Promise.reject(new Error('Unknown URL'));
    });
    global.fetch = mockFetch;
  });

  test('fetches and returns the correct dataset count from the API', async () => {
    const DMS_URL = 'http://localhost:5500';
    const getDatasetCount = makeDatasetCount(DMS_URL);

    const count = await getDatasetCount();

    expect(count).toEqual(100);
    expect(global.fetch).toHaveBeenCalledWith(`${DMS_URL}/api/3/action/package_search?rows=0`, {
      cache: 'force-cache',
      next: { revalidate: 3600 },
    });
  });
});
