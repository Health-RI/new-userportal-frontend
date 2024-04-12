// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0
import { ExtendedSession } from '@/utils/auth';
import { decrypt } from '@/utils/encryption';
import { DatasetSearchQuery, Facet, FacetGroup, facetToLabelMapping } from './types/packageSearch.types';

export const createHeaders = (session?: ExtendedSession): Record<string, string> => {
  let headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (session?.access_token) {
    headers['Authorization'] = `Bearer ${decrypt(session.access_token)}`;
  }

  return headers;
};

export const DEFAULT_DATASET_SEARCH_QUERY: DatasetSearchQuery = {
  rows: 0,
};

export const flattenFacets = (facetGroups: FacetGroup[]): Facet[] => {
  let facets: Facet[] = [];

  for (let group of facetGroups) {
    facets = [
      ...facets,
      ...group.facets.map((facet) => ({
        label: facetToLabelMapping[facet.label] ?? facet.label,
        field: facet.label,
        values: facet.values,
      })),
    ];
  }

  return facets;
};
