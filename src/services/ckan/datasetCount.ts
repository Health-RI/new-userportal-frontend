// SPDX-FileCopyrightText: 2024 PNED G.I.E.
// SDPX-Contributor: Stichting Health-RI
//
// SPDX-License-Identifier: Apache-2.0

// import axios from 'axios';
import { constructCkanActionUrl } from './utils';

export const makeDatasetCount = (DMS: string) => {
  return async (): Promise<number> => {
    const url = constructCkanActionUrl(DMS, 'dataset_list');
    const raw_response = await fetch(url, { cache: 'force-cache' });
    const response = await raw_response.json();
    return response.result.count;
  };
};
