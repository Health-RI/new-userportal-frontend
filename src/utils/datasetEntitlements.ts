// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { datasetList } from '@/services/discovery/index.public';
import { DatasetEntitlement, SearchedDataset } from '@/services/discovery/types/dataset.types';
import { DatasetSearchOptions } from '@/services/discovery/types/datasetSearch.types';
import { Entitlement } from '@/types/entitlements.types';

export const mapToDatasetEntitlement = (datasets: SearchedDataset[], entitlements: Entitlement[]): DatasetEntitlement[] => {
  return entitlements.map((e) => ({
    dataset: datasets.find((x) => x.identifier === e.datasetId),
    start: e.start,
    end: e.end,
  }));
};

export const createDatasetEntitlmenets = async (entitlements: Entitlement[]): Promise<DatasetEntitlement[]> => {
  const bulkSize = 1000;
  let options: DatasetSearchOptions = {
    limit: bulkSize,
    offset: 0,
  };

  let retrivedDatasets = [] as SearchedDataset[];

  while (true) {
    const datasetsResponse = await datasetList(options);
    const datasetCount = datasetsResponse.data.count;

    retrivedDatasets = [...retrivedDatasets, ...datasetsResponse.data.datasets];

    if (datasetCount <= bulkSize) {
      break;
    }

    if (datasetCount <= retrivedDatasets.length) {
      break;
    }

    options = {
      offset: retrivedDatasets.length,
    };
  }

  return mapToDatasetEntitlement(retrivedDatasets, entitlements);
};
