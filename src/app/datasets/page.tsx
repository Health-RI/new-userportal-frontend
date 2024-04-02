// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import ClientWrapper from "@/app/datasets/clientWrapper";
import { datasetList } from "@/services/ckan";
import { PackageSearchOptions } from "@/services/ckan/types/packageSearch.types";
import { redirect } from "next/navigation";

type DatasetPageProps = {
  searchParams: Record<string, string>;
};

function parseFacets(
  searchParams: Record<string, string>,
): Record<string, string[]> {
  const facets: Record<string, string[]> = {};
  for (const key in searchParams) {
    if (!["page", "q", "sort"].includes(key)) {
      facets[key] = searchParams[key].split(",");
    }
  }
  return facets;
}

async function DatasetPage({ searchParams }: DatasetPageProps) {
  if (!searchParams?.page) {
    redirect("/datasets?page=1");
  }
  const DATASET_PER_PAGE = 12;

  const options: PackageSearchOptions = {
    facets: parseFacets(searchParams),
    offset: searchParams.page ? Number(searchParams.page) - 1 : 0,
    limit: DATASET_PER_PAGE,
    query: searchParams?.q as string | undefined,
    sort: searchParams?.sort as string | "relevance",
    include_private: false,
  };

  const datasets = await datasetList(options);

  return (
    <ClientWrapper
      queryParams={searchParams}
      datasets={datasets}
      datasetPerPage={DATASET_PER_PAGE}
      facets={datasets.facets}
    />
  );
}

export default DatasetPage;
