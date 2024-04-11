// SPDX-FileCopyrightText: 2024 PNED G.I.E.
// SDPX-Contributor: Stichting Health-RI
//
// SPDX-License-Identifier: Apache-2.0

import { PortalStatistics } from './types/portalStatistics.types';
import axios from 'axios';
import { CkanKey, DatasetsSearchResponse, FacetType } from './types/packageSearch.types';
import { ExtendedSession } from '@/utils/auth';
import { DEFAULT_DATASET_SEARCH_QUERY, constructSearchUrl, createHeaders } from './utils';

export const makePortalStatistics = (discoveryUrl: string, session?: ExtendedSession) => {
  return async (): Promise<PortalStatistics> => {
    const response = await axios.post<DatasetsSearchResponse>(
      constructSearchUrl(discoveryUrl),
      DEFAULT_DATASET_SEARCH_QUERY,
      {
        headers: createHeaders(session),
      },
    );

    const ckanFacetGroup = response.data.facetGroups.find((x) => x.key === CkanKey);
    const countFacet = (facet: FacetType) => ckanFacetGroup?.facets.find((x) => x.label === facet)?.values?.length ?? 0;

    return {
      catalogues: countFacet(FacetType.Organization),
      keywords: countFacet(FacetType.Tags),
      themes: countFacet(FacetType.Theme),
    };
  };
};
