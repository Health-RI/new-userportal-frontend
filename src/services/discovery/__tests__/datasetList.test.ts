// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { jest } from '@jest/globals';
import axios from 'axios';
import { makeDatasetList } from '../datasetList';
import { searchedDatasetFixture } from '../fixtures/datasetFixtures';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('datasetList', () => {
  const mockApiResponse = {
    data: {
      count: 1,
      results: [searchedDatasetFixture],
      facetGroups: [],
    },
  };
  beforeEach(() => {
    mockedAxios.post.mockResolvedValue(mockApiResponse);
  });

  afterEach(() => {
    mockedAxios.post.mockClear();
  });

  test('maps and asserts the full server response', async () => {
    const datasetList = makeDatasetList('https://mock-discovery-service.com.com');
    const { datasets, count } = await datasetList({});

    expect(count).toEqual(1);
    const dataset = datasets[0];
    expect(dataset.id).toEqual('id');
    expect(dataset.title).toEqual('title');
    expect(dataset.description).toEqual('desc');
    expect(dataset.themes).toEqual([
      {
        value: 'value',
        label: 'label',
      },
    ]);
    expect(dataset.catalogue).toEqual('umcg');
    expect(dataset.modifiedAt).toEqual('12-01-2023');
    expect(dataset.createdAt).toEqual('02-02-2024');
    expect(dataset.identifier).toEqual('Dataset Identifier');
  });

  test('applies tag filters correctly', async () => {
    const datasetList = makeDatasetList('https://mock-discovery-service.com');
    const searchOptions = {
      facets: [
        {
          facetGroup: 'ckan',
          facet: 'tags',
          value: 'education',
        },
        {
          facetGroup: 'ckan',
          facet: 'tags',
          value: 'science',
        },
      ],
      limit: 1,
    };
    const expectedBody = {
      start: 0,
      rows: 1,
      facets: [
        {
          facetGroup: 'ckan',
          facet: 'tags',
          value: 'education',
        },
        {
          facetGroup: 'ckan',
          facet: 'tags',
          value: 'science',
        },
      ],
    };
    await datasetList(searchOptions);

    expect(mockedAxios.post).toHaveBeenCalled();
    expect(mockedAxios.post).toHaveBeenCalledWith('https://mock-discovery-service.com/api/v1/datasets/search', expectedBody, {
      headers: { 'Content-Type': 'application/json' },
    });
  });

  test('applies organization filters correctly', async () => {
    const datasetList = makeDatasetList('https://mock-discovery-service.com');
    const searchOptions = {
      facets: [
        {
          facetGroup: 'ckan',
          facet: 'organization',
          value: 'org1',
        },
        {
          facetGroup: 'beacon',
          facet: 'organization',
          value: 'org-2',
        },
      ],
      limit: 1,
    };
    const expectedBody = {
      start: 0,
      rows: 1,
      facets: [
        {
          facetGroup: 'ckan',
          facet: 'organization',
          value: 'org1',
        },
        {
          facetGroup: 'beacon',
          facet: 'organization',
          value: 'org-2',
        },
      ],
    };
    await datasetList(searchOptions);

    expect(mockedAxios.post).toHaveBeenCalled();
    expect(mockedAxios.post).toHaveBeenCalledWith('https://mock-discovery-service.com/api/v1/datasets/search', expectedBody, {
      headers: { 'Content-Type': 'application/json' },
    });
  });

  test('combines multiple filters correctly', async () => {
    const datasetList = makeDatasetList('https://mock-discovery-service.com');
    const searchOptions = {
      facets: [
        {
          facetGroup: 'ckan',
          facet: 'tags',
          value: 'technology',
        },
        {
          facetGroup: 'ckan',
          facet: 'tags',
          value: 'http://example.com/other-tag',
        },
        {
          facetGroup: 'beacon',
          facet: 'organization',
          value: 'org-2',
        },
        {
          facetGroup: 'ckan',
          facet: 'publisher_name',
          value: 'A random publisher',
        },
        {
          facetGroup: 'ckan',
          facet: 'organization',
          value: 'org-1',
        },
        {
          facetGroup: 'beacon',
          facet: 'theme',
          value: 'group-1',
        },
      ],
      limit: 2,
    };
    const expectedBody = {
      start: 0,
      rows: 2,
      facets: [
        {
          facetGroup: 'ckan',
          facet: 'tags',
          value: 'technology',
        },
        {
          facetGroup: 'ckan',
          facet: 'tags',
          value: 'http://example.com/other-tag',
        },
        {
          facetGroup: 'beacon',
          facet: 'organization',
          value: 'org-2',
        },
        {
          facetGroup: 'ckan',
          facet: 'publisher_name',
          value: 'A random publisher',
        },
        {
          facetGroup: 'ckan',
          facet: 'organization',
          value: 'org-1',
        },
        {
          facetGroup: 'beacon',
          facet: 'theme',
          value: 'group-1',
        },
      ],
    };

    await datasetList(searchOptions);

    expect(mockedAxios.post).toHaveBeenCalled();
    expect(mockedAxios.post).toHaveBeenCalledWith('https://mock-discovery-service.com/api/v1/datasets/search', expectedBody, {
      headers: { 'Content-Type': 'application/json' },
    });
  });
});
