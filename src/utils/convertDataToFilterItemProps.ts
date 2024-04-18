// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { type Option } from '@/components/ui/multipleSelector';
import { Facet, FacetGroup, ValueLabel } from '@/services/discovery/types/datasetSearch.types';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export type FilterItemProps = {
  field: string;
  label: string;
  groupKey: string;
  data: Option[];
  icon?: IconDefinition;
};

function convertDataToFilterItemProps(fieldToIconMap: Record<string, IconDefinition>, facetGroup: FacetGroup): FilterItemProps[] {
  return facetGroup.facets.map((facet: Facet) => {
    return {
      field: facet.key,
      label: facet.label,
      groupKey: facetGroup.key,
      data: facet.values.map((vl: ValueLabel) => {
        return {
          label: vl.label,
          value: vl.value,
        };
      }),
      icon: fieldToIconMap[facet.key],
    };
  });
}

export { convertDataToFilterItemProps };
