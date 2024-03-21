// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import axios from 'axios';
import { PackageSearchOptions, PackageSearchResult } from './types/packageSearch.types';
import { constructCkanActionUrl, mapCKANPackageToDataset } from './utils';

export const makeDatasetList = (DMS: string) => {
  return async (options: PackageSearchOptions): Promise<PackageSearchResult> => {
    const queryParams = constructQueryParams(options);
    const url = constructCkanActionUrl(DMS, 'package_search', queryParams);

    try {
      const response = await axios.get(url);
      return {
        datasets: response.data.result.results.map(mapCKANPackageToDataset),
        count: response.data.result.count,
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
  const catalogueFilter = buildFilterQueryPart(options.catalogues || []);
  const themeFilter = buildFilterQueryPart(options.themes || []);
  const publisherFilter = buildFilterQueryPart(options.publishers || []);
  const keywordFilter = buildFilterQueryPart(options.keywords || []);

  const filters = [
    catalogueFilter && `organization:(${catalogueFilter})`,
    themeFilter && `extras_theme:(${themeFilter})`,
    publisherFilter && `extras_publisher_name:(${publisherFilter})`,
    keywordFilter && `tags:(${keywordFilter})`,
  ]
    .filter(Boolean)
    .join(' AND ');

  let queryParams = `start=${options.offset || 0}&rows=${options.limit || 10}`;
  queryParams += filters ? `&fq=${encodeURIComponent(filters)}` : '';
  queryParams += options.query ? `&q=${options.query}` : '';
  queryParams += options.sort ? `&sort=${options.sort}` : '';
  queryParams += options.include_private ? `&include_private=${options.include_private}` : '';

  return queryParams;
};
