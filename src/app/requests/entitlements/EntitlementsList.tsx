// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import List from "@/components/List";
import ListItem from "@/components/List/ListItem";
import { DatasetEntitlement } from "@/services/discovery/types/dataset.types";
import DatasetCard from "@/components/DatasetCard";

type EntitlementsListProps = {
  entitlements: DatasetEntitlement[];
};

function EntitlementsList({ entitlements }: Readonly<EntitlementsListProps>) {
  return (
    <List>
      {entitlements.map(
        (entitlement: DatasetEntitlement) =>
          entitlement.dataset && (
            <ListItem
              key={`${entitlement.dataset.id}${entitlement.start}${entitlement.end}`}
            >
              <DatasetCard
                dataset={entitlement.dataset}
                isEntitlement={true}
                start={entitlement.start}
                end={entitlement.end}
              />
            </ListItem>
          ),
      )}
    </List>
  );
}

export default EntitlementsList;
