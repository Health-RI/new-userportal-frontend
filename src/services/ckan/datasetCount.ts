// SPDX-FileCopyrightText: 2024 PNED G.I.E.
// SDPX-Contributor: Stichting Health-RI
//
// SPDX-License-Identifier: Apache-2.0

import { constructCkanActionUrl } from './utils';

const REVALIDATE_SECONDS = 24 * 3600;

export const makeDatasetCount = (DMS: string) => {
  return async (): Promise<number> => {
    const url = constructCkanActionUrl(DMS, 'dataset_list');
    const raw_response = await fetch(url, { cache: 'force-cache', next: { revalidate: REVALIDATE_SECONDS } });
    const response = await raw_response.json();
    return response.result.count;
  };
};
