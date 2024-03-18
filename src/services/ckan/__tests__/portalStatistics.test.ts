// SPDX-FileCopyrightText: 2024 PNED G.I.E.
// SPDX-FileContributor: Stichting Health-RI
//
// SPDX-License-Identifier: Apache-2.0

import { jest } from '@jest/globals';
import { makePortalStatistics } from '../portalStatistics';

describe('makePortalStatistics', () => {
  const mockFetch = jest.fn<(input: string | Request | URL, init?: RequestInit | undefined) => Promise<Response>>();

  beforeEach(() => {
    mockFetch.mockClear().mockImplementation((url: string | Request | URL, init?: RequestInit | undefined) => {
      if (url === 'http://localhost:5500/api/3/action/theme_list?') {
        return Promise.resolve(new Response(JSON.stringify({ result: { count: 379 } })));
      } else if (url === 'http://localhost:5500/api/3/action/catalogue_list?') {
        return Promise.resolve(new Response(JSON.stringify({ result: { count: 5 } })));
      } else if (url === 'http://localhost:5500/api/3/action/keyword_list?') {
        return Promise.resolve(new Response(JSON.stringify({ result: { count: 490 } })));
      }
      return Promise.reject(new Error('Unknown URL'));
    });
    global.fetch = mockFetch;
  });

  test('fetches and returns the correct counts for portal statistics', async () => {
    const DMS_URL = 'http://localhost:5500';
    const getPortalStatistics = makePortalStatistics(DMS_URL);

    const portalStatistics = await getPortalStatistics();

    expect(portalStatistics).toEqual({
      themes: 379,
      catalogues: 5,
      keywords: 490,
    });

    expect(global.fetch).toHaveBeenCalledTimes(3);
    expect(global.fetch).toHaveBeenNthCalledWith(1, `${DMS_URL}/api/3/action/theme_list?`, { cache: 'force-cache' });
    expect(global.fetch).toHaveBeenNthCalledWith(2, `${DMS_URL}/api/3/action/catalogue_list?`, { cache: 'force-cache' });
    expect(global.fetch).toHaveBeenNthCalledWith(3, `${DMS_URL}/api/3/action/keyword_list?`, { cache: 'force-cache' });
  });
});
