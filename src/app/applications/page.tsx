// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

"use client";

import { listApplications } from "@/services/daam/index.client";
import React, { useEffect, useState } from "react";
import ApplicationItem from "./applicationItem";
import PageHeading from "@/components/PageHeading";
import { ListedApplication } from "@/types/application.types";

const ApplicationsPage: React.FC = () => {
  const [data, setData] = useState<ListedApplication[]>([]);
  const collapseLimit = 2;

  useEffect(() => {
    listApplications().then((res) => setData(res.data));
  }, []);

  const collapsable = data.length > collapseLimit;

  return (
    <div className="container mx-auto px-5">
      <PageHeading className="mt-8">Manage your Applications</PageHeading>
      <span>View and update your submited applications</span>

      <div className="mt-5 flex grow flex-col items-center">
        {data.map((item) => (
          <ApplicationItem
            key={item.id}
            application={item}
            collapsable={collapsable}
          />
        ))}
      </div>
    </div>
  );
};

export default ApplicationsPage;
