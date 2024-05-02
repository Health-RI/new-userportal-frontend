// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { format } from 'date-fns';

export function formatDate(inputDate: string): string {
  return _formatDate(inputDate, 'd MMMM yyyy');
}

export function formatDateTime(inputDate: string) {
  return _formatDate(inputDate, 'd MMMM yyyy HH:mm zzz');
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
