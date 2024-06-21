// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import List from "@/components/List";
import ListItem from "@/components/List/ListItem";
import { SearchedDataset } from "@/services/discovery/types/dataset.types";
import DatasetCard from "@/components/DatasetCard";

type DatasetListProps = {
  datasets: SearchedDataset[];
};

function DatasetList({ datasets }: Readonly<DatasetListProps>) {
  return (
    <List>
      {datasets.map((dataset: SearchedDataset) => (
        <ListItem key={dataset.id}>
          <DatasetCard dataset={dataset} isEntitlement={false} />
        </ListItem>
      ))}
    </List>
  );
}

export default DatasetList;
