// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { faBook, faUser } from '@fortawesome/free-solid-svg-icons';
import { convertDataToFilterItemProps } from '../dto';

describe('Map field details objects to filter item props', () => {
  it('should map field details to filter item props', () => {
    const facets = [
      {
        field: 'publisher_name',
        label: 'Publishers',
        values: ['adeling NKR-analyse', 'Centro Nacional de Epidemiología', 'sciensano Network of General Practitioners team'],
        count: 3,
      },
      {
        field: 'organization',
        label: 'Catalogues',
        values: ['EU', 'lumc', 'Umcg'],
        count: 3,
      },
    ];

    const fieldToIconMap = {
      publisher_name: faUser,
      organization: faBook,
    };

    const expected = [
      {
        field: 'publisher_name',
        label: 'Publishers',
        data: [
          {
            label: 'adeling NKR-analyse',
            value: 'adeling NKR-analyse',
          },
          {
            label: 'Centro Nacional de Epidemiología',
            value: 'Centro Nacional de Epidemiología',
          },
          {
            label: 'sciensano Network of General Practitioners team',
            value: 'sciensano Network of General Practitioners team',
          },
        ],
        icon: faUser,
      },
      {
        field: 'organization',
        label: 'Catalogues',
        data: [
          {
            label: 'EU',
            value: 'EU',
          },
          {
            label: 'lumc',
            value: 'lumc',
          },
          {
            label: 'Umcg',
            value: 'Umcg',
          },
        ],
        icon: faBook,
      },
    ];

    const result = convertDataToFilterItemProps(facets, fieldToIconMap);

    expect(result).toEqual(expected);
  });
  it('should return object with empty data for facet with empty values', () => {
    const facets = [
      {
        field: 'publisher_name',
        label: 'Publishers',
        values: [],
        count: 3,
      },
    ];

    const fieldToIconMap = {
      publisher_name: faUser,
    };

    const expected = [
      {
        field: 'publisher_name',
        label: 'Publishers',
        data: [],
        icon: faUser,
      },
    ];

    const result = convertDataToFilterItemProps(facets, fieldToIconMap);

    expect(result).toEqual(expected);
  });

  it('should return object with undefined icon if field of facet object is not in keys of fieldToIconMap object', () => {
    const facets = [
      {
        field: 'publisher_name',
        label: 'Publishers',
        values: [],
        count: 3,
      },
    ];

    const fieldToIconMap = {
      organization: faBook,
    };

    const expected = [
      {
        field: 'publisher_name',
        label: 'Publishers',
        data: [],
        icon: undefined,
      },
    ];

    const result = convertDataToFilterItemProps(facets, fieldToIconMap);

    expect(result).toEqual(expected);
  });
});
