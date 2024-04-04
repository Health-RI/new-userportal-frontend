// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { FilterItemProps } from '@/app/datasets/filterItem';
import { FieldDetails } from '@/services/ckan/types/fieldDetails.types';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

function convertDataToFilterItemProps(data: FieldDetails[], fieldToIconMap: Record<string, IconDefinition>): FilterItemProps[] {
  return data.map((fieldDetails: FieldDetails) => {
    return {
      label: fieldDetails.field + 's',
      data: fieldDetails.values.map((v: string) => {
        return {
          label: v,
          value: v,
        };
      }),
      icon: fieldToIconMap[fieldDetails.field],
    };
  });
}

export { convertDataToFilterItemProps };
