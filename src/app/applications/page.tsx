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

  const data = [
    {
      id: 1,
      title: 'My datasetr 1',
      currentState: 'what state',
      stateChangedAt: new Date()
    },
    {
      id: 2,
      title: 'My datasetr 2',
      currentState: 'what state',
      stateChangedAt: new Date()
    }
  ];

  return (
    <div className="container mx-auto">
      <PageHeading className="mt-8">
        Manage your Applications
      </PageHeading>
      <span>View and update your submited applications</span>

      {data.map((item) => (
        <ApplicationItem
          key={item.id}
          application={item}
        />
      ))}
    </div>
  );
};


export default ApplicationsPage;
