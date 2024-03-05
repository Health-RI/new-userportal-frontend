// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import axios from 'axios';
import { constructCkanActionUrl } from './utils';

export const makePortalStatistics = (DMS: string) => {
  return async (): Promise<{ [key: string]: number }> => {
    const props = ['theme', 'catalogue', 'keyword'];
    const counts = await Promise.all(
      props.map(async (prop) => {
        const url = constructCkanActionUrl(DMS, `${prop}_list`);
        const response = await axios.get(url);
        return response.data.result.count;
      }),
    );

    const countsObject = props.reduce<{ [key: string]: number }>((acc, prop, index) => {
      const propKey = `${prop.charAt(0).toUpperCase()}${prop.slice(1)}s`;
      acc[propKey] = counts[index];
      return acc;
    }, {});
    return countsObject;
  };
};
