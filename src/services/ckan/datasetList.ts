// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import axios from 'axios';
import { FacetType, PackageSearchOptions, PackageSearchResult } from './types/packageSearch.types';
import { constructCkanActionUrl, mapCKANPackageToDataset } from './utils';

const facetToLabelMapping: Record<FacetType, string> = {
  organization: 'Catalogues',
  theme: 'Themes',
  access_rigths: 'Access Rights',
  publisher_name: 'Publishers',
  res_format: 'File Formats',
  spatial_uri: 'Spatial Coverage',
  tags: 'Keywords',
};

export const makeDatasetList = (DMS: string) => {
  return async (options: PackageSearchOptions): Promise<PackageSearchResult> => {
    const queryParams = constructQueryParams(options);
    const url = constructCkanActionUrl(DMS, 'package_search', queryParams);

    try {
      const response = await axios.get(url);
      const facets = response.data.result.facets || {};
      const fields = Object.keys(facets).map((field) => {
        return {
          field: field,
          label: mapFacetToLabel(field),
          count: Object.keys(facets[field]).length,
          values: Object.keys(facets[field]).sort((a: string, b: string) => a.localeCompare(b)),
        };
      });
      return {
        datasets: response.data.result.results.map(mapCKANPackageToDataset),
        count: response.data.result.count,
        facets: fields,
      };
    } catch (error) {
      throw new Error(`HTTP error! ${error}`);
    }
  };
};

const buildFilterQueryPart = (filters: string[]): string => {
  return filters.map((filter: string) => `"${filter}"`).join(' AND ');
};

const constructQueryParams = (options: PackageSearchOptions): string => {
  const nonNullFacets = options.facets || {};
  const facets = Object.keys(nonNullFacets).map((facet) => {
    const facetValues = nonNullFacets[facet];
    const query = buildFilterQueryPart(facetValues || []);
    return query && `${facet}:(${query})`;
  });

  const filters = facets.filter(Boolean).join(' AND ');

  let queryParams = `facet.field=["access_rights","theme","tags","spatial_uri","organization","publisher_name","res_format"]&facet.limit=-1&start=${options.offset || 0}&rows=${options.limit || 10}`;
  queryParams += filters ? `&fq=${encodeURIComponent(filters)}` : '';
  queryParams += options.query ? `&q=${options.query}` : '';
  queryParams += options.sort ? `&sort=${options.sort}` : '';
  queryParams += options.include_private ? `&include_private=${options.include_private}` : '';

  return queryParams;
};
