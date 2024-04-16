// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0
import { format } from 'date-fns';

export function formatDate(inputDate: string): string {
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
