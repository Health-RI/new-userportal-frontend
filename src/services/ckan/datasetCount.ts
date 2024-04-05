// SPDX-FileCopyrightText: 2024 PNED G.I.E.
// SDPX-Contributor: Stichting Health-RI
//
// SPDX-License-Identifier: Apache-2.0

import axios from 'axios';
import { DatasetSearchQuery, DatasetsSearchResponse } from './types/packageSearch.types';

export const makeDatasetCount = (ddsUrl: string) => {
  return async (): Promise<number> => {
    const datasetSearchQuery = {
      rows: 0,
    } as DatasetSearchQuery;

    const response = await axios.post<DatasetsSearchResponse>(`${ddsUrl}/api/v1/datasets/search`, datasetSearchQuery, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    // return response.data.count;
    return 11600; 
  };
};
