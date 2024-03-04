// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import axios from 'axios';
import { constructCkanActionUrl } from './utils';

export const makeOrganizationList = (DMS: string) => {
  return async (): Promise<string[]> => {
    const url = constructCkanActionUrl(DMS, 'organization_list');
    const response = await axios.get(url);
    return response.data.result;
  };
};
