// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import 'dotenv/config';
import { exposeFont, tabularFont, satoshiFont, robotoFont } from './fonts';

type FontType = 'LIGHT' | 'MEDIUM' | 'SANS';

const fonts = {
  expose: exposeFont,
  tabular: tabularFont,
  satoshi: satoshiFont,
  roboto: robotoFont,
};

export function getSelectedFonts(): string {
  const selectedFonts: Array<{ type: FontType; name: string | undefined }> = [
    { type: 'LIGHT', name: process.env.NEXT_PUBLIC_SELECTED_FONT_LIGHT },
    { type: 'MEDIUM', name: process.env.NEXT_PUBLIC_SELECTED_FONT_MEDIUM },
    { type: 'SANS', name: process.env.NEXT_PUBLIC_SELECTED_FONT_SANS },
  ];

  return selectedFonts
    .map(({ name }) => {
      if (name && name.toLowerCase() in fonts) {
        return fonts[name.toLowerCase() as keyof typeof fonts].variable;
      }
      return '';
    })
    .filter(Boolean)
    .join(' ');
}

export const fontVariables = getSelectedFonts();
