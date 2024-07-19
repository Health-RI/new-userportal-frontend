// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0
import { ValueLabel } from './datasetSearch.types';

export interface RetrievedDataset {
  id: string;
  identifier: string;
  title: string;
  description: string;
  themes: ValueLabel[];
  publisherName: string;
  catalogue: string;
  createdAt: string;
  modifiedAt: string;
  url: string;
  languages: ValueLabel[];
  contact: ValueLabel[];
  creator: ValueLabel[];
  hasVersions: ValueLabel[];
  accessRights: ValueLabel;
  conformsTo: ValueLabel[];
  provenance: string;
  spatial: ValueLabel;
  distributions: RetrievedDistribution[];
  keywords: ValueLabel[];
}

export type SearchedDataset = {
  id: string;
  identifier?: string;
  title: string;
  description?: string;
  themes?: ValueLabel[];
  catalogue: string;
  modifiedAt: string;
  createdAt: string;
  recordsCount?: number;
};

export type DatasetEntitlement = {
  dataset?: SearchedDataset;
  start: string;
  end: string;
};

export interface RetrievedDistribution {
  id: string;
  title: string;
  description: string;
  format: ValueLabel;
  createdAt: string;
  modifiedAt: string;
}
