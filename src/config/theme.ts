// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0
import 'dotenv/config';

export const themeConfig = {
  colors: {
    primary: process.env.NEXT_PUBLIC_COLOR_PRIMARY,
    secondary: process.env.NEXT_PUBLIC_COLOR_SECONDARY,
    info: process.env.NEXT_PUBLIC_COLOR_INFO,
    warning: process.env.NEXT_PUBLIC_COLOR_WARNING,
    'hover-color': process.env.NEXT_PUBLIC_COLOR_HOVER_COLOR,
    disclaimer: process.env.NEXT_PUBLIC_disclaimer,
    surface: process.env.NEXT_PUBLIC_COLOR_SURFACE,
  },
  fonts: {
    light: process.env.NEXT_PUBLIC_SELECTED_FONT_LIGHT,
    medium: process.env.NEXT_PUBLIC_SELECTED_FONT_MEDIUM,
    sans: process.env.NEXT_PUBLIC_SELECTED_FONT_SANS,
  },
};
