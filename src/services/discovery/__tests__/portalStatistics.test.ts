// SPDX-FileCopyrightText: 2024 PNED G.I.E.
// SPDX-FileContributor: Stichting Health-RI
//
// SPDX-License-Identifier: Apache-2.0

import { jest } from '@jest/globals';
import { makePortalStatistics } from '../portalStatistics';

describe('makePortalStatistics', () => {
  const mockFetch = jest.fn<(input: string | Request | URL, init?: RequestInit | undefined) => Promise<Response>>();

  beforeEach(() => {
    mockFetch.mockClear().mockImplementation((url: string | Request | URL) => {
      if (
        url ===
        'http://localhost:5500/api/3/action/package_search?facet.field=["organization","theme","tags"]&rows=0&facet.limit=-1'
      ) {
        return Promise.resolve(
          new Response(
            JSON.stringify({
              result: {
                facets: {
                  organization: { org1: 1 },
                  theme: { theme1: 1, theme2: 2 },
                  tags: { tag1: 1, tag2: 2, tag3: 3 },
                },
              },
            }),
          ),
        );
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
      catalogues: 1,
      themes: 2,
      keywords: 3,
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenNthCalledWith(
      1,
      `${DMS_URL}/api/3/action/package_search?facet.field=["organization","theme","tags"]&rows=0&facet.limit=-1`,
      {
        cache: 'force-cache',
        next: { revalidate: 3600 },
      },
    );
  });
});
