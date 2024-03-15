// SPDX-FileCopyrightText: 2024 PNED G.I.E.
// SDPX-Contributor: Stichting Health-RI
//
// SPDX-License-Identifier: Apache-2.0

import { constructCkanActionUrl } from './utils';
import { PortalStatistics } from './types/portalStatistics.types';

const REVALIDATE_SECONDS = 24 * 3600;

export const makePortalStatistics = (DMS: string) => {
  return async (): Promise<PortalStatistics> => {
    const props: Array<'theme' | 'catalogue' | 'keyword'> = ['theme', 'catalogue', 'keyword'];
    const counts = await Promise.all(
      props.map(async (prop) => {
        const url = constructCkanActionUrl(DMS, `${prop}_list`);
        const raw_response = await fetch(url, { cache: 'force-cache', next: { revalidate: REVALIDATE_SECONDS } });
        const response = await raw_response.json();
        return response.result.count;
      }),
    );

    const countsObject = props.reduce<PortalStatistics>(
      (acc, prop, index) => {
        const propKey = (prop + 's') as keyof PortalStatistics;
        acc[propKey] = counts[index];
        return acc;
      },
      {
        catalogues: 0,
        keywords: 0,
        themes: 0,
      },
    );

    return countsObject;
  };
};
