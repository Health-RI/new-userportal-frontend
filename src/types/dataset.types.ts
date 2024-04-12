// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

export interface DatasetDistribution {
  accessServices: string;
  accessUrl: string;
  availability: string;
  cacheLastUpdated: null | string;
  cacheUrl: null | string;
  compressFormat: string;
  conformsTo: string;
  created: string;
  description: string;
  documentation: string;
  downloadUrl: string;
  format: string;
  hasPolicy: string;
  hash: string;
  hashAlgorithm: string;
  id: string;
  issued: string;
  language: string;
  lastModified: null | string;
  metadataModified: string;
  mimetype: null | string;
  mimetypeInner: null | string;
  modified: string;
  name: string;
  packageFormat: string;
  packageId: string;
  position: number;
  resourceType: null | string;
  rights: string;
  spatialResolutionInMeters: string;
  state: string;
  status: string;
  temporalResolution: string;
  url: string;
  urlType: string | null;
}
