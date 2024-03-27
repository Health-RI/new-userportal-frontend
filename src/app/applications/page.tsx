// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

'use client'

import { listApplications } from "@/services/daam/index.client";
import React, { useEffect, useState } from "react";
import ApplicationItem from "./applicationItem";
import PageHeading from "@/components/PageHeading";

const ApplicationsPage: React.FC = () => {
  // const [data, setData] = useState<ListedApplication[]>([]);

  // useEffect(() => {
  //   listApplications()
  //     .then((res) => setData(res))
  // });

  const collapseLimit = 2;

  const data = [
    {
      id: 1,
      title: 'My datasetr 1',
      currentState: 'Submited',
      stateChangedAt: new Date()
    },
    {
      id: 2,
      title: 'My datasetr 2',
      currentState: 'Draft',
      stateChangedAt: new Date()
    }, {
      id: 3,
      title: 'My datasetr 23',
      currentState: 'Approved',
      stateChangedAt: new Date()
    }
  ];
  const collapsable = data.length > collapseLimit;

  return (
    <div className="container mx-auto px-5">
      <PageHeading className="mt-8">
        Manage your Applications
      </PageHeading>
      <span>View and update your submited applications</span>

      <div className="flex flex-col items-center grow mt-5">
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
