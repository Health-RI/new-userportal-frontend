// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

"use client";

import { listApplications } from "@/services/daam/index.client";
import React, { useEffect, useState } from "react";
import ApplicationItem from "./ApplicationItem";
import PageContainer from "@/components/PageContainer";
import PageHeading from "@/components/PageHeading";
import LoadingContainer from "@/components/LoadingContainer";
import CenteredListContainer from "@/components/CenteredListContainer";
import List from "@/components/List";
import ListItem from "@/components/List/ListItem";
import Button from "@/components/button";
import { ListedApplication } from "@/types/application.types";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const ApplicationsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<ListedApplication[]>([]);

  useEffect(() => {
    listApplications().then((res) => {
      setApplications(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <LoadingContainer text="Loading your applications..." />;
  }

  return (
    <PageContainer>
      <PageHeading className="mb-4">Manage your Applications</PageHeading>
      <span>View and update your submited applications</span>
      <CenteredListContainer>
        {applications.length > 0 ? (
          <List>
            {applications.map((item, index) => (
              <ListItem
                key={item.id}
                className="flex items-center justify-between"
              >
                <ApplicationItem application={item} isExpanded={index === 0} />
              </ListItem>
            ))}
          </List>
        ) : (
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <p className="text-center text-lg text-primary">
              You don&apos;t have any applications yet.
            </p>
            <Button
              icon={faPlusCircle}
              text="Add datasets"
              href="/datasets"
              type="primary"
            />
          </div>
        )}
      </CenteredListContainer>
    </PageContainer>
  );
};

export default ApplicationsPage;
