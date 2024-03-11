// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { Lato } from 'next/font/google';

export const latoFont = Lato({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-lato',
  display: 'swap',
});

import localFont from 'next/font/local';

export const exposeFont = localFont({
  src: [
    {
      path: './../public/fonts/Expose-Regular.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './../public/fonts/Expose-Regular.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: './../public/fonts/Expose-Regular.ttf',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-expose',
  display: 'swap',
});

// export const tabularFont = localFont({
//   src: [
//     {
//       path: './../public/fonts/Tabular-Regular.woff2',
//       weight: '500',
//       style: 'normal',
//     },
//     {
//       path: './../public/fonts/Tabular-Regular.woff',
//       weight: '500',
//       style: 'normal',
//     },
//     {
//       path: './../public/fonts/Tabular-Regular.ttf',
//       weight: '500',
//       style: 'normal',
//     },
//   ],
//   variable: '--font-tabular',
//   display: 'swap',
// });

export const satoshiFont = localFont({
  src: [
    {
      path: './../public/fonts/Satoshi-Regular.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './../public/fonts/Satoshi-Regular.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: './../public/fonts/Satoshi-Regular.ttf',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-satoshi',
  display: 'swap',
});
