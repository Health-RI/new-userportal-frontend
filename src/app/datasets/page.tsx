// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

"use client";

import { Dataset } from "@/types/dataset.types";
import DatasetList from "@/components/datasetList";
import FilterList from "./FilterList";
import PaginationContainer from "@/components/PaginationContainer";
import SearchBar from "@/components/SearchBar";
import PageContainer from "@/components/PageContainer";
import LoadingContainer from "@/components/LoadingContainer";
import { useWindowSize } from "@/hooks";
import { SCREEN_SIZE, pixelWidthToScreenSize } from "@/utils/windowSize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { datasetList } from "@/services/ckan";
import { PackageSearchOptions } from "@/services/ckan/types/packageSearch.types";
import { redirect } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Error from "@/app/error";
import { AxiosError } from "axios";
import { type Facet } from "@/services/ckan/types/packageSearch.types";

function parseFacets(queryParams: URLSearchParams): Record<string, string[]> {
  const facets: Record<string, string[]> = {};
  queryParams.forEach((value, key) => {
    if (!["page", "q", "sort"].includes(key)) {
      facets[key] = value.split(",");
    }
  });
  return facets;
}

type Status = "loading" | "error" | "success";

interface DatasetResponse {
  status: Status;
  datasets?: Dataset[];
  datasetCount?: number;
  facets?: Facet[];
  errorCode?: number;
}

const DATASET_PER_PAGE = 12;

export default function DatasetPage() {
  const queryParams = useSearchParams();
  const { width } = useWindowSize();
  const screenSize = pixelWidthToScreenSize(width);
  const [isFullScreenFilterOpen, toggleFullScreenFilter] = useState(false);
  const [response, setResponse] = useState<DatasetResponse>({
    status: "loading",
  });

  if (!queryParams.get("page")) {
    redirect("/datasets?page=1");
  }

  useEffect(() => {
    const options: PackageSearchOptions = {
      facets: parseFacets(queryParams),
      offset: queryParams.get("page") ? Number(queryParams.get("page")) - 1 : 0,
      limit: DATASET_PER_PAGE,
      query: queryParams.get("q") as string | undefined,
      sort: queryParams.get("sort") as string | "relevance",
      include_private: false,
    };

    async function fetchData() {
      try {
        setResponse({ status: "loading" });
        const response = await datasetList(options);
        setResponse({
          datasets: response.datasets,
          datasetCount: response.count,
          facets: response.facets,
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

    if (screenSize === SCREEN_SIZE.XL) toggleFullScreenFilter(false);
  }, [queryParams, screenSize]);

  if (response.status === "loading") {
    return <LoadingContainer text="Loading datasets..." />;
  } else if (response.status === "error") {
    return <Error statusCode={response.errorCode} />;
  }

  return (
    <PageContainer>
      <div className="grid grid-cols-12">
        {isFullScreenFilterOpen ? (
          <div className="col-start-0 col-span-12 rounded-lg border bg-white-smoke">
            <FilterList
              facets={response!.facets!}
              toggleFullScreenFilter={toggleFullScreenFilter}
              queryParams={queryParams}
            />
          </div>
        ) : (
          <>
            <div className="col-start-0 col-span-12 flex items-center justify-between xl:col-span-10 xl:col-start-2">
              <SearchBar queryParams={queryParams} />
              <button
                className="ml-4 h-11 rounded-lg bg-info px-4 text-xs text-white hover:bg-secondary md:text-xs xl:hidden"
                onClick={() => toggleFullScreenFilter(!isFullScreenFilterOpen)}
              >
                <FontAwesomeIcon icon={faFilter} />
              </button>
            </div>
            <p className="col-start-0 col-span-12 mb-12 mt-5 text-center text-sm text-info">
              {`${response.datasetCount!} ${response.datasetCount! > 1 ? "datasets" : "dataset"} found`}
            </p>
            <div className="border-1 col-start-0 col-span-4 mr-6 hidden h-fit rounded-lg border bg-white-smoke xl:block">
              <FilterList
                facets={response!.facets!}
                queryParams={queryParams}
              />
            </div>
            <div className="col-start-0 col-span-12 xl:col-span-8 xl:col-start-5">
              <DatasetList datasets={response.datasets!} />
            </div>
            <div className="col-start-0 col-span-12 mt-20 xl:col-span-8 xl:col-start-5">
              <PaginationContainer
                datasetCount={response.datasetCount!}
                datasetPerPage={DATASET_PER_PAGE}
                pathname="/datasets"
                queryParams={queryParams}
              />
            </div>
          </>
        )}
      </div>
    </PageContainer>
  );
}
