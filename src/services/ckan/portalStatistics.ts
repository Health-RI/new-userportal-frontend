// SPDX-FileCopyrightText: 2024 PNED G.I.E.
// SDPX-Contributor: Stichting Health-RI
//
// SPDX-License-Identifier: Apache-2.0

import { PortalStatistics } from './types/portalStatistics.types';
import axios from 'axios';
import { DatasetSearchQuery, DatasetsSearchResponse } from './types/packageSearch.types';

export const makePortalStatistics = (ddsUrl: string) => {
  return async (): Promise<PortalStatistics> => {
    const datasetSearchQuery = {
      rows: 0,
      facets: [
        {
          facet: 'organization',
        },
        {
          facet: 'theme',
        },
        {
          facet: 'tags',
        },
      ],
    } as DatasetSearchQuery;

    const response = await axios.post<DatasetsSearchResponse>(`${ddsUrl}/api/v1/datasets/search`, datasetSearchQuery, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return {
      catalogues: response.data.facetGroups.find((x) => x.label === 'organization')?.facets.length ?? 0,
      keywords: response.data.facetGroups.find((x) => x.label === 'tags')?.facets.length ?? 0,
      themes: response.data.facetGroups.find((x) => x.label === 'theme')?.facets.length ?? 0,
    };
  };
};
