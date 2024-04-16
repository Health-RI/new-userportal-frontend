// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import axios, { AxiosResponse } from 'axios';
import { DatasetSearchQuery, DatasetSearchOptions, DatasetsSearchResponse } from './types/datasetSearch.types';
import { createHeaders } from './utils';
import { ExtendedSession } from '@/utils/auth';

export const makeDatasetList = (discoveryUrl: string) => {
  return async (options: DatasetSearchOptions, session?: ExtendedSession): Promise<AxiosResponse<DatasetsSearchResponse>> => {
    const datasetSearchQuery = {
      start: options?.offset ?? 0,
      rows: options?.limit ?? 10,
      query: options?.query,
      sort: options?.sort,
      facets: options.facets,
    } as DatasetSearchQuery;

    return await axios.post<DatasetsSearchResponse>(`${discoveryUrl}/api/v1/datasets/search`, datasetSearchQuery, {
      headers: await createHeaders(session),
    });
  };
};
