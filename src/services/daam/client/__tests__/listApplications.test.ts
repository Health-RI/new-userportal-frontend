// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { jest } from '@jest/globals';
import axios from 'axios';
import { listApplications } from '../listApplications';
import { ListedApplication } from '@/types/application.types';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('listApplications', () => {
  const mockApiResponse = [
    {
      id: 1,
      title: 'Test application 1',
      stateChangedAt: new Date('27-03-2024'),
      currentState: 'Submited'
    },
    {
      id: 2,
      title: 'Test application 2',
      stateChangedAt: new Date('25-03-2024'),
      currentState: 'Approved'
    }
  ] as ListedApplication[];

  beforeEach(() => {
    mockedAxios.get.mockResolvedValue(mockApiResponse);
  });

  afterEach(() => {
    mockedAxios.get.mockClear();
  });

  test('sends a GET request and retrives applications of signed in user', async () => {
    var data = await listApplications();

    expect(data.length).toBe(2);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      '/api/applications',
      { headers: { 'Content-Type': 'application/json' } },
    );
  });
});
