// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import axios from 'axios';
import {
  DatasetSearchQuery,
  DatasetsSearchResponse,
  PackageSearchOptions,
  PackageSearchResult,
  facetToLabelMapping,
} from './types/packageSearch.types';
import { ExtendedSession } from '@/utils/auth';
import { decrypt } from '@/utils/encryption';

export const makeDatasetList = (ddsUrl: string, session?: ExtendedSession) => {
  return async (options: PackageSearchOptions): Promise<PackageSearchResult> => {
    // const queryParams = constructQueryParams(options);
    // const url = constructCkanActionUrl(DMS, 'package_search', queryParams);
    
    const datasetSearchQuery = {
      start: options.offset ?? 0,
      rows: options.limit ?? 10,
    } as DatasetSearchQuery;

    // "access_rights","theme","tags","spatial_uri","organization","publisher_name","res_format"

    try {
      const response = await axios.post<DatasetsSearchResponse>(`${ddsUrl}/api/v1/datasets/search`, datasetSearchQuery, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${decrypt(session?.access_token ?? '')}`,
        },
      });


      console.log(response)
      const facetsGroups = response.data.facetGroups;

      const fields = facetsGroups.map((fg) => {
        return {
          field: fg.label,
          label: facetToLabelMapping[fg.label],
          values: Object.keys(fg.facets).sort((a: string, b: string) => a.localeCompare(b)),
        };
      });

      // return {
      //   datasets: response.data.results,
      //   count: response.data.count,
      //   facets: fields,
      // };
    } catch (error) {
      throw new Error(`HTTP error! ${error}`);
    }
  };
};

// const buildFilterQueryPart = (filters: string[]): string => {
//   return filters.map((filter: string) => `"${filter}"`).join(' AND ');
// };

// const constructQueryParams = (options: PackageSearchOptions): string => {
//   const nonNullFacets = options.facets || {};
//   const facets = Object.keys(nonNullFacets).map((facet) => {
//     const facetValues = nonNullFacets[facet];
//     const query = buildFilterQueryPart(facetValues || []);
//     return query && `${facet}:(${query})`;
//   });

//   const filters = facets.filter(Boolean).join(' AND ');

//   let queryParams = `facet.field=["access_rights","theme","tags","spatial_uri","organization","publisher_name","res_format"]&facet.limit=-1&start=${options.offset || 0}&rows=${options.limit || 10}`;
//   queryParams += filters ? `&fq=${encodeURIComponent(filters)}` : '';
//   queryParams += options.query ? `&q=${options.query}` : '';
//   queryParams += options.sort ? `&sort=${options.sort}` : '';
//   queryParams += options.include_private ? `&include_private=${options.include_private}` : '';

//   return queryParams;
// };
