// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import MultipleSelector from "@/components/shadcn/multipleSelector";
import { FilterItemProps } from "@/utils/convertDataToFilterItemProps";

function FilterItem({ field, label, data, groupKey }: FilterItemProps) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-x-3">
        <p className="text-bold text-info">{label}</p>
      </div>
      <MultipleSelector
        field={`${groupKey}-${field}`}
        defaultOptions={data}
        placeholder={label}
        className="text-[0.8rem]"
        emptyIndicator={
          <p className="text-center text-[0.8rem] leading-10">
            No results found.
          </p>
        }
        badgeClassName="bg-warning text-black text-[0.7rem] max-w-full break-all"
      />
    </div>
  );
}

export default FilterItem;
