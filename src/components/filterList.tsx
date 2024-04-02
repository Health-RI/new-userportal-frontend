// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { type Facet } from "@/services/ckan/types/packageSearch.types";
import { convertDataToFilterItemProps } from "@/utils/dto";
import {
  faBook,
  faFilter,
  faMagnifyingGlass,
  faTags,
  faUser,
  faFile,
  faKey,
  faLocation,
  type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Button from "./button";
import FilterItem, { FilterItemProps } from "./filterItem";

const fieldToIconMap: Record<string, IconDefinition> = {
  publisher_name: faUser,
  organization: faBook,
  theme: faTags,
  tags: faMagnifyingGlass,
  res_format: faFile,
  access_rights: faKey,
  spatial_uri: faLocation,
};

type FilterListProps = {
  facets: Facet[];
  displayContinueButton?: boolean;
  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  queryParams: Record<string, string | string[] | undefined>;
};

function FilterList({
  facets,
  displayContinueButton = false,
  setIsFilterOpen,
  queryParams,
}: FilterListProps) {
  const filterItemProps: FilterItemProps[] = convertDataToFilterItemProps(
    facets,
    fieldToIconMap,
  );

  function isAnyFilterApplied() {
    if (!queryParams) return false;
    return Object.keys(queryParams).some(
      (key) => key !== "page" && key !== "q" && queryParams[key],
    );
  }

  return (
    <div className="flex flex-col gap-y-10 rounded-lg bg-white-smoke px-6 py-8">
      <h1 className="text-xl">
        <span className="mr-2">
          <FontAwesomeIcon icon={faFilter} />
        </span>
        Filters
      </h1>
      {filterItemProps.map((props) => (
        <li key={props.field} className="list-none">
          <FilterItem
            field={props.field}
            label={props.label}
            data={props.data}
            icon={props.icon}
          />
        </li>
      ))}
      <div className="mt-4 flex justify-between">
        {isAnyFilterApplied() && (
          <Link
            href={`/datasets?page=1${queryParams.q ? `&q=${queryParams.q}` : ""}`}
          >
            <Button
              text="Clear Filters"
              type="primary"
              className="w-fit text-xs"
            />
          </Link>
        )}
        {displayContinueButton && (
          <Button
            text="Continue"
            type="info"
            className="w-fit text-xs"
            onClick={() => setIsFilterOpen(false)}
          ></Button>
        )}
      </div>
    </div>
  );
}

export default FilterList;
