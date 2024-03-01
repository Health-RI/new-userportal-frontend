// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { jest } from '@jest/globals';
import axios from 'axios';
import { makePortalStatistics } from '../portalStatistics';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('makePortalStatistics', () => {
  const mockDatasetResponse = { data: { result: { count: 1155 } } };
  const mockCatalogueResponse = { data: { result: { count: 5 } } };
  const mockKeywordResponse = { data: { result: { count: 490 } } };

  beforeEach(() => {
    mockedAxios.get
      .mockResolvedValueOnce(mockDatasetResponse)
      .mockResolvedValueOnce(mockCatalogueResponse)
      .mockResolvedValueOnce(mockKeywordResponse);
  });

  afterEach(() => {
    mockedAxios.get.mockClear();
  });

  test('fetches and returns the correct counts for portal statistics', async () => {
    const DMS_URL = 'http://localhost:5500';
    const getPortalStatistics = makePortalStatistics(DMS_URL);

    const portalStatistics = await getPortalStatistics();

    expect(portalStatistics).toEqual({
      Datasets: 1155,
      Catalogues: 5,
      Keywords: 490,
    });

    expect(mockedAxios.get).toHaveBeenNthCalledWith(1, `${DMS_URL}/api/3/action/dataset_list?`);
    expect(mockedAxios.get).toHaveBeenNthCalledWith(2, `${DMS_URL}/api/3/action/catalogue_list?`);
    expect(mockedAxios.get).toHaveBeenNthCalledWith(3, `${DMS_URL}/api/3/action/keyword_list?`);
  });
});
