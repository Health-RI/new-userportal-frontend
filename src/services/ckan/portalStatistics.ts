// SPDX-FileCopyrightText: 2024 PNED G.I.E.
// SDPX-Contributor: Stichting Health-RI
//
// SPDX-License-Identifier: Apache-2.0

import { constructCkanActionUrl } from './utils';
import { PortalStatistics } from './types/portalStatistics.types';

const REVALIDATE_SECONDS = 3600;

export const makePortalStatistics = (DMS: string) => {
  return async (): Promise<PortalStatistics> => {
    const url = constructCkanActionUrl(
      DMS,
      'package_search',
      `facet.field=["organization","theme","tags"]&rows=0&facet.limit=-1`,
    );
    const raw_response = await fetch(url, { cache: 'force-cache', next: { revalidate: REVALIDATE_SECONDS } });

    const response = await raw_response.json();
    const facets = response.result.facets || {};

    return {
      catalogues:10,
      keywords: 10,
      themes: 10,
    };
  };
};
