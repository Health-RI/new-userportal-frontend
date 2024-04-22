// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { format } from 'date-fns';

export function formatDate(inputDate: string): string {
  return _formatDate(inputDate, 'yyyy-MM-dd');
}

export function formatDateTime(inputDate: string) {
  return _formatDate(inputDate, 'yyyy-MM-dd HH:mm:ss');
}

function _formatDate(inputDate: string, targetFormat: string) {
  if (!inputDate) {
    return 'N/A';
  }

  const date = new Date(inputDate);

  try {
    return format(date, targetFormat);
  } catch (error) {
    if (process.env.NODE_ENV !== 'test') {
      console.error(error);
    }
    return inputDate;
  }
}
