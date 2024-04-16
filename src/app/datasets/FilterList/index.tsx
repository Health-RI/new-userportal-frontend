// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import {
  FilterItemProps,
  convertDataToFilterItemProps,
} from "@/utils/convertDataToFilterItemProps";
import {
  FacetType,
  type Facet,
} from "@/services/discovery/types/datasetSearch.types";
import {
  faBook,
  faFilter,
  faMagnifyingGlass,
  faTags,
  faUser,
  faFile,
  faKey,
  faLocation,
  faX,
  type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@/components/Button";
import FilterItem from "./FilterItem";

const fieldToIconMap: Record<FacetType, IconDefinition> = {
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
  toggleFullScreenFilter?: React.Dispatch<React.SetStateAction<boolean>>;
  queryParams: URLSearchParams;
  groupKey: string;
};

function FilterList({
  facets,
  toggleFullScreenFilter,
  queryParams,
  groupKey,
}: FilterListProps) {
  const filterItemProps: FilterItemProps[] = convertDataToFilterItemProps(
    facets,
    fieldToIconMap,
    groupKey,
  );
  function isAnyFilterApplied() {
    if (!queryParams) return false;
    return Array.from(queryParams.keys()).some(
      (key) => key !== "page" && key !== "q" && queryParams.get(key),
    );
  }

  return (
    <div className="flex flex-col gap-y-10 rounded-lg bg-white-smoke px-6 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl text-primary">
          <span className="mr-2">
            <FontAwesomeIcon icon={faFilter} />
          </span>
          <span className="mr-2">{groupKey.toUpperCase()}</span>
          Filters
        </h1>
        {toggleFullScreenFilter && (
          <button
            className="hover:text-secondary"
            onClick={() => toggleFullScreenFilter(false)}
          >
            <FontAwesomeIcon icon={faX} />
          </button>
        )}
      </div>
      {filterItemProps.map((props) => (
        <li key={props.field} className="list-none">
          <FilterItem
            field={props.field}
            label={props.label}
            data={props.data}
            icon={props.icon}
            groupKey={props.groupKey}
          />
        </li>
      ))}
      {isAnyFilterApplied() || toggleFullScreenFilter ? (
        <div className="mt-4 flex justify-end gap-x-4">
          {isAnyFilterApplied() && (
            <Button
              href={`/datasets?page=1${queryParams.get("q") ? `&q=${queryParams.get("q")}` : ""}`}
              text="Clear Filters"
              type="warning"
            />
          )}
          {toggleFullScreenFilter && (
            <Button
              text="Continue"
              type="info"
              onClick={() => toggleFullScreenFilter(false)}
            ></Button>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default FilterList;
