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

export type Facet = {
  field: string;
  label: string;
  values: string[];
  count: number;
};
