// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0
import { format } from 'date-fns';

export function formatDate(inputDate: string): string {
  if (!inputDate) {
    return 'N/A';
  }

  const date = new Date(inputDate);

  try {
    return format(date, 'yyyy-MM-dd');
  } catch (error) {
    if (process.env.NODE_ENV !== 'test') {
      console.error(error);
    }
    return inputDate;
  }
}

export function formatDateTime(date: string) {
  if (!date) {
    return 'N/A';
  }

  const dateObj = new Date(date);

  try {
    return format(dateObj, 'yyyy-MM-dd HH:mm:ss');
  } catch (error) {
    if (process.env.NODE_ENV !== 'test') {
      console.error(error);
    }
    return date;
  }
}
