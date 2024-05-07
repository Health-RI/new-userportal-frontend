// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

"use client";

import Sidebar from "@/components/Sidebar";
import { RetrievedDataset } from "@/services/discovery/types/dataset.types";
import { createDatasetSidebarItems } from "./sidebarItems";

type ClientSidebarProps = {
  dataset: RetrievedDataset;
};

function ClientSidebar({ dataset }: ClientSidebarProps) {
  const sidebarItems = createDatasetSidebarItems(dataset);
  return (
    <aside className="w-full lg:w-1/3">
      <Sidebar items={sidebarItems} />
    </aside>
  );
}

export default ClientSidebar;
