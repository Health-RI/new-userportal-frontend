// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import axios from 'axios';
import {
  DatasetSearchQuery,
  DatasetsSearchResponse,
  PackageSearchOptions,
  DatasetsSearchResult,
} from './types/packageSearch.types';
import { ExtendedSession } from '@/utils/auth';
import { createHeaders, flattenFacets } from './utils';

export const makeDatasetList = (discoveryUrl: string, session?: ExtendedSession) => {
  return async (options: PackageSearchOptions): Promise<DatasetsSearchResult> => {
    const datasetSearchQuery = {
      start: options.offset ?? 0,
      rows: options.limit ?? 10,
      query: options.query,
      sort: options.sort,
      facets: options.facets,
    } as DatasetSearchQuery;

    try {
      const response = await axios.post<DatasetsSearchResponse>(`${discoveryUrl}/api/v1/datasets/search`, datasetSearchQuery, {
        headers: createHeaders(session),
      });

      const flattendFacets = flattenFacets(response.data.facetGroups);

      return {
        datasets: response.data.results,
        count: response.data.count,
        facets: flattendFacets,
      };
    } catch (error) {
      throw new Error(`HTTP error! ${error}`);
    }
  };
};
