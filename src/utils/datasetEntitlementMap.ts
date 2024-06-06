// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { DatasetEntitlement, SearchedDataset } from '@/services/discovery/types/dataset.types';
import { Entitlement } from '@/types/entitlements.types';

export const mapToDatasetEntitlement = (datasets: SearchedDataset[], entitlements: Entitlement[]): DatasetEntitlement[] => {
  return entitlements.map((e) => ({
    dataset: datasets.find((x) => x.identifier === e.datasetId),
    start: e.start,
    end: e.end,
  }));
};
