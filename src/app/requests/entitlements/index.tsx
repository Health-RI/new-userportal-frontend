// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0
"use client";

import List from "@/components/List";
import ListContainer from "@/components/ListContainer";
import PageContainer from "@/components/PageContainer";
import PageHeading from "@/components/PageHeading";
import { useEffect, useState } from "react";
import { Status } from "@/utils/pageStatus.types";
import { retrieveEntitlements } from "@/services/daam/index.client";
import { AxiosError } from "axios";
import ErrorBoundary from "@/app/error";
import { datasetList } from "@/services/discovery/index.public";
import { DatasetEntitlement } from "@/services/discovery/types/dataset.types";
import { DatasetSearchOptions } from "@/services/discovery/types/datasetSearch.types";
import { mapToDatasetEntitlement } from "@/utils/datasetEntitlementMap";
import EntitlementsList from "./EntitlementsList";

interface EntitelementsResponse {
  datasetEntitlements?: DatasetEntitlement[];
  status: Status;
  errorCode?: number;
}

function EntitelementsPage() {
  const [response, setResponse] = useState<EntitelementsResponse>({
    status: "loading",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const entitlements = await retrieveEntitlements();

        const options: DatasetSearchOptions = {
          limit: 1000,
        };

        const datasets = await datasetList(options);

        const datasetEntitlements = mapToDatasetEntitlement(
          datasets.data.datasets,
          entitlements.data.entitlements,
        );

        setResponse({
          datasetEntitlements: datasetEntitlements,
          status: "success",
        });
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
      <PageHeading className="mb-4">Entitlements</PageHeading>
      <p>You have been granted these </p>
      <ListContainer>
        <List>
          <EntitlementsList entitlements={response.datasetEntitlements ?? []} />
        </List>
      </ListContainer>
    </PageContainer>
  );
}

export default EntitelementsPage;
