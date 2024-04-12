// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { SearchedDataset } from './dataset.types';

export interface PackageSearchOptions {
  facets?: DatasetSearchQueryFacet[];
  offset?: number;
  limit?: number;
  query?: string;
  sort?: string;
  include_private?: boolean;
}

export interface DatasetsSearchResult {
  datasets: SearchedDataset[];
  count: number;
  facetGroups: FacetGroup[];
}

export enum FacetType {
  Organization = 'organization',
  Theme = 'theme',
  Tags = 'tags',
  PublisherName = 'publisher_name',
  ResponseFormat = 'res_format',
  AccessRights = 'access_rights',
  SpatialUrl = 'spatial_uri',
}

export const facetToLabelMapping: Record<string, string> = {
  organization: 'Catalogues',
  theme: 'Themes',
  access_rights: 'Access Rights',
  publisher_name: 'Publishers',
  res_format: 'File Formats',
  spatial_uri: 'Spatial Coverage',
  tags: 'Keywords',
};

export type DatasetSearchQueryFacet = {
  facetGroup: string;
  facet: string;
  value: string;
};

export type DatasetSearchQuery = {
  query?: string;
  facets?: DatasetSearchQueryFacet[];
  sort?: string;
  rows?: number;
  start?: number;
};

export type ValueLabel = {
  value: string;
  label: string;
};

export type DatasetsSearchResponse = {
  count: number;
  results: SearchedDataset[];
  facetGroups: FacetGroup[];
};

export type FacetGroup = {
  label: string;
  key: string;
  facets: Facet[];
};

export type Facet = {
  field: string;
  label: string;
  values: ValueLabel[];
};

export enum DatasetSource {
  Ckan = 'ckan',
  Beacon = 'beacon',
}
