// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { ListedApplication } from '@/types/application.types';
import axios from 'axios';

export const listApplications = async (): Promise<ListedApplication[]> => {
  return await axios.get('/api/applications', {
    headers: {
      'Content-Type': 'application/json'
    },
  });
};
