// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { faFilter, faDatabase } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type FiltersHeaderProps = {
  groupKey: string;
};

function FiltersHeader({ groupKey }: FiltersHeaderProps) {
  return (
    <div>
      <h1 className="text-xl">
        <span className="mr-2">
          <FontAwesomeIcon icon={faFilter} />
        </span>
        <span className="mr-2">{groupKey.toUpperCase()}</span>
        Filters
      </h1>
    </div>
  );
}

export default FiltersHeader;
