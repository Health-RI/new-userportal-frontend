// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { type Option } from '@/components/shadcn/multipleSelector';
import { Facet, ValueLabel } from '@/services/discovery/types/datasetSearch.types';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export type FilterItemProps = {
  field: string;
  label: string;
  groupKey: string;
  data: Option[];
  icon: IconDefinition;
};

function convertDataToFilterItemProps(
  facets: Facet[],
  fieldToIconMap: Record<string, IconDefinition>,
  groupKey: string,
): FilterItemProps[] {
  return facets.map((facet: Facet) => {
    return {
      field: facet.field,
      label: facet.label,
      groupKey: groupKey,
      data: facet.values.map((vl: ValueLabel) => {
        return {
          label: vl.label,
          value: vl.value,
        };
      }),
      icon: fieldToIconMap[facet.field],
    };
  });
}

export { convertDataToFilterItemProps };
