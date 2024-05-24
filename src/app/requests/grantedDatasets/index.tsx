// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0
"use client";

import List from "@/components/List";
import ListContainer from "@/components/ListContainer";
import PageContainer from "@/components/PageContainer";
import PageHeading from "@/components/PageHeading";
import DatasetList from "../applications/DatasetList";
import { useEffect, useState } from "react";
import { Entitlement } from "@/types/entitlements.types";
import { Status } from "@/utils/pageStatus.types";
import { retrieveEntitlements } from "@/services/daam/index.client";
import { AxiosError } from "axios";
import ErrorBoundary from "@/app/error";

interface EntitelementsResponse {
  entitlements?: Entitlement[];
  status: Status;
  errorCode?: number;
}

function GrantedDatasetsPage() {
  const [response, setResponse] = useState<EntitelementsResponse>({
    status: "loading",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await retrieveEntitlements();
        setResponse({ entitlements: response.data, status: "success" });
      } catch (error) {
        if (error instanceof AxiosError) {
          setResponse({ status: "error", errorCode: error.response?.status });
          console.error(error);
        } else {
          setResponse({ status: "error", errorCode: 500 });
          console.error(error);
        }
      }
    }
    fetchData();
  }, []);

  if (response.status === "error") {
    return <ErrorBoundary statusCode={response.errorCode} />;
  }

  return (
    <PageContainer className="pt-5 md:pt-10">
      <PageHeading className="mb-4">Granted Datasets</PageHeading>
      <p>You have been granted access to these datasets</p>
      <ListContainer>
        <List>
          <DatasetList datasets={[]} />
        </List>
      </ListContainer>
    </PageContainer>
  );
}

export default GrantedDatasetsPage;
