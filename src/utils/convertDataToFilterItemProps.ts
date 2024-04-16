// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { type Option } from '@/components/shadcn/multipleSelector';
import { Facet } from '@/services/ckan/types/packageSearch.types';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export type FilterItemProps = {
  field: string;
  label: string;
  data: Option[];
  icon: IconDefinition;
};

function convertDataToFilterItemProps(facets: Facet[], fieldToIconMap: Record<string, IconDefinition>): FilterItemProps[] {
  return facets.map((facet: Facet) => {
    return {
      field: facet.field,
      label: facet.label,
      data: facet.values.map((v: string) => {
        return {
          label: v,
          value: v,
        };
      }),
      icon: fieldToIconMap[facet.field],
    };
  });
}

export { convertDataToFilterItemProps };
