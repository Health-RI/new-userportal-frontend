// SPDX-FileCopyrightText: 2024 PNED G.I.E.
// SDPX-Contributor: Stichting Health-RI
//
// SPDX-License-Identifier: Apache-2.0

import axios from 'axios';
import { DatasetsSearchResponse } from './types/packageSearch.types';
import { DEFAULT_DATASET_SEARCH_QUERY, constructSearchUrl, createHeaders } from './utils';

export const makeDatasetCount = (discoveryUrl: string) => {
  return async (): Promise<number> => {
    const response = await axios.post<DatasetsSearchResponse>(constructSearchUrl(discoveryUrl), DEFAULT_DATASET_SEARCH_QUERY, {
      headers: createHeaders(),
    });

    return response.data.count;
  };
};
