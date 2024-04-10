// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationProps = {
  datasetCount: number;
  datasetPerPage: number;
  pathname: string;
  queryParams: URLSearchParams;
};

function PaginationContainer({
  datasetCount,
  datasetPerPage,
  pathname,
  queryParams,
}: PaginationProps) {
  const currentPage = Number(queryParams.get("page")) || 1;
  const lastPageNb = Math.ceil(datasetCount / datasetPerPage) || 1;

  function createHref(page: number) {
    const params = new URLSearchParams(queryParams.toString());
    params.set("page", page.toString());
    return `${pathname}?${params}`;
  }

  return (
    <Pagination>
      <PaginationContent>
        {currentPage !== 1 && (
          <PaginationPrevious
            href={createHref(currentPage - 1)}
            className="hover:text-hover-color text-info"
          />
        )}
        <PaginationLink
          href={createHref(1)}
          isActive={currentPage === 1}
          className="hover:text-hover-color text-info"
        >
          1
        </PaginationLink>
        {currentPage > 4 && (
          <PaginationItem className="hover:text-hover-color text-info">
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {currentPage > 3 && (
          <PaginationLink
            href={createHref(currentPage - 2)}
            className="hover:text-hover-color text-info"
          >
            {currentPage - 2}
          </PaginationLink>
        )}
        {Number(currentPage) > 2 && (
          <PaginationLink
            href={createHref(currentPage - 1)}
            className="hover:text-hover-color text-info"
          >
            {currentPage - 1}
          </PaginationLink>
        )}
        {currentPage !== 1 && (
          <PaginationLink
            href={createHref(currentPage)}
            isActive
            className="hover:text-hover-color text-info"
          >
            {currentPage}
          </PaginationLink>
        )}
        {currentPage < lastPageNb - 1 && (
          <PaginationLink
            href={createHref(currentPage + 1)}
            className="hover:text-hover-color text-info"
          >
            {currentPage + 1}
          </PaginationLink>
        )}
        {currentPage < lastPageNb - 2 && (
          <PaginationLink
            href={createHref(currentPage + 2)}
            className="hover:text-hover-color text-info"
          >
            {currentPage + 2}
          </PaginationLink>
        )}
        {currentPage < lastPageNb - 3 && (
          <PaginationItem className="hover:text-hover-color text-info">
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {currentPage !== lastPageNb && (
          <PaginationLink
            href={createHref(lastPageNb)}
            className="hover:text-hover-color text-info"
          >
            {lastPageNb}
          </PaginationLink>
        )}
        {currentPage !== lastPageNb && (
          <PaginationNext
            href={createHref(currentPage + 1)}
            className="hover:text-hover-color text-info"
          />
        )}
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationContainer;
