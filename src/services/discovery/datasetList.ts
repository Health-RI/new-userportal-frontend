// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import axios from 'axios';
import {
  DatasetSearchQuery,
  DatasetsSearchResponse,
  PackageSearchOptions,
  DatasetsSearchResult,
} from './types/datasetSearch.types';
import { createHeaders, mapFacetGroups } from './utils';
import { ExtendedSession } from '@/utils/auth';

export const makeDatasetList = (discoveryUrl: string) => {
  return async (options: PackageSearchOptions, session?: ExtendedSession): Promise<DatasetsSearchResult> => {
    const datasetSearchQuery = {
      start: options.offset ?? 0,
      rows: options.limit ?? 10,
      query: options.query,
      sort: options.sort,
      facets: options.facets,
    } as DatasetSearchQuery;

    const response = await axios.post<DatasetsSearchResponse>(`${discoveryUrl}/api/v1/datasets/search`, datasetSearchQuery, {
      headers: await createHeaders(session),
    });

    return {
      datasets: response.data.results,
      count: response.data.count,
      facetGroups: mapFacetGroups(response.data.facetGroups),
    };
  };
};
