// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0
import { Dataset } from './../../../types/dataset.types';

export interface PackageSearchOptions {
  facets?: Record<string, string[]>;
  offset?: number;
  limit?: number;
  query?: string;
  sort?: string;
  include_private?: boolean;
}

export interface PackageSearchResult {
  datasets: Dataset[];
  count: number;
  facets: Facet[];
}

// export type Facet = {
//   field: string;
//   label: string;
//   values: string[];
//   count: number;
// };

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

export type SearchedDataset = {
  id: string;
  identifier?: string;
  title: string;
  description: string;
  themes?: ValueLabel[];
  catalogue: string;
  modifiedAt: string;
  recordsCount?: number;
};

export type DatasetsSearchResponse = {
  count: number;
  results: SearchedDataset[];
  facetGroups: FacetGroup[];
};

export type FacetGroup = {
  label: string;
  facets: Facet[];
};

export type Facet = {
  label: string;
  values: ValueLabel[];
};
