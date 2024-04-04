// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { FilterItemProps } from '@/components/filterItem';
import { Facet } from '@/services/ckan/types/packageSearch.types';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

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
