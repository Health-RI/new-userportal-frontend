// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0
import { ValueLabel } from './packageSearch.types';

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
  contact: ValueLabel;
  hasVersions: ValueLabel[];
  accessRigths: ValueLabel[];
  conformsTo: ValueLabel[];
  provenance: string;
  spatial: ValueLabel;
  distributions: RetrievedDistribution[];
  metadataCreatedAt: string;
  keywords: ValueLabel[];
}

export type SearchedDataset = {
  id: string;
  identifier?: string;
  title: string;
  description: string;
  themes?: ValueLabel[];
  catalogue: string;
  modifiedAt: string;
  metadataCreatedAt: string;
  recordsCount?: number;
};

export interface RetrievedDistribution {
  id: string;
  title: string;
  description: string;
  format: ValueLabel;
  createdAt: string;
  modifiedAt: string;
}
