// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { jest } from '@jest/globals';
import axios from 'axios';
import { makeOrganizationList } from '../organizationList';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchOrganizationNames', () => {
  const mockApiResponse = {
    data: {
      result: ['czech-demo', 'eu', 'lumc', 'radboud', 'umcg'],
    },
  };

  beforeEach(() => {
    mockedAxios.get.mockResolvedValue(mockApiResponse);
  });

  afterEach(() => {
    mockedAxios.get.mockClear();
  });

  test('returns the correct list of organization names', async () => {
    const DMS_URL = 'http://localhost:5500';
    const getOrganizationNames = makeOrganizationList(DMS_URL);

    const organizationNames = await getOrganizationNames();

    expect(organizationNames).toEqual(mockApiResponse.data.result);
    expect(mockedAxios.get).toHaveBeenCalledWith(`${DMS_URL}/api/3/action/organization_list?`);
  });
});
