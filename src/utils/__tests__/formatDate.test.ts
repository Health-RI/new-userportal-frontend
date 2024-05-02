// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0
import { formatDate, formatDateTime } from './../formatDate';

describe('formatDate', () => {
  it('formats the date correctly from ISO string', () => {
    const input = '2024-02-09T10:27:47.585Z';
    const expected = '9 February 2024';
    expect(formatDate(input)).toEqual(expected);
  });

  it('returns the same date if the date is incorrect', () => {
    const input = 'blah';
    const expected = 'blah';
    expect(formatDate(input)).toEqual(expected);
  });
});

describe('formatDateTime', () => {
  it('formats the date correctly from ISO string', () => {
    const input = '2024-02-09T10:27:47.585Z';
    const expected = '9 February 2024, 11.27 (CET)';
    expect(formatDateTime(input)).toEqual(expected);
  });

  it('returns the same date if the date is incorrect', () => {
    const input = 'blah';
    const expected = 'blah';
    expect(formatDateTime(input)).toEqual(expected);
  });
});
