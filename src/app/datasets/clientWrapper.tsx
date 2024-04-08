// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

"use client";

import DatasetList from "@/components/datasetList";
import FilterList from "./FilterList";
import PaginationContainer from "@/components/paginationContainer";
import SearchBar from "@/components/SearchBar";
import PageContainer from "@/components/PageContainer";
import { useWindowSize } from "@/hooks";
import { Facet } from "@/services/ckan/types/packageSearch.types";
import { PackageSearchResult } from "@/services/ckan/types/packageSearch.types";
import { SCREEN_SIZE, pixelWidthToScreenSize } from "@/utils/windowSize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

type ClientWrapperProps = {
  datasets: PackageSearchResult;
  datasetPerPage: number;
  queryParams: Record<string, string>;
  facets: Facet[];
};

export default function ClientWrapper({
  datasets,
  datasetPerPage,
  queryParams,
  facets,
}: ClientWrapperProps) {
  const [isFullScreenFilterOpen, toggleFullScreenFilter] = useState(false);
  const { width } = useWindowSize();
  const screenSize = pixelWidthToScreenSize(width);

  useEffect(() => {
    if (screenSize === SCREEN_SIZE.XL) toggleFullScreenFilter(false);
  }, [screenSize]);

  return (
    <PageContainer>
      <div className="grid grid-cols-12">
        {isFullScreenFilterOpen ? (
          <div className="col-start-0 col-span-12 rounded-lg border bg-white-smoke">
            <FilterList
              facets={facets}
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
              {`${datasets.count} ${datasets.count > 1 ? "datasets" : "dataset"} found`}
            </p>
            <div className="border-1 col-start-0 col-span-4 mr-6 hidden h-fit rounded-lg border bg-white-smoke xl:block">
              <FilterList facets={facets} queryParams={queryParams} />
            </div>
            <div className="col-start-0 col-span-12 xl:col-span-8 xl:col-start-5">
              <DatasetList datasets={datasets.datasets} />
            </div>
            <div className="col-start-0 col-span-12 mt-20 text-info xl:col-span-8 xl:col-start-5">
              <PaginationContainer
                datasetCount={datasets.count}
                datasetPerPage={datasetPerPage}
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
