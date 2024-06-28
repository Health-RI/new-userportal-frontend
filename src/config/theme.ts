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
    'wine-berry': process.env.NEXT_PUBLIC_COLOR_WINE_BERRY,
    claret: process.env.NEXT_PUBLIC_COLOR_CLARET,
    'white-smoke': process.env.NEXT_PUBLIC_COLOR_WHITE_SMOKE,
    'scampi-blue': process.env.NEXT_PUBLIC_COLOR_SCAMPI_BLUE,
    'grandis-yellow': process.env.NEXT_PUBLIC_COLOR_GRANDIS_YELLOW,
  },
};
