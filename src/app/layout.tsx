// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import Disclaimer from "@/components/disclaimer";
import Footer from "@/components/footer";
import Header from "@/components/header";
import SessionProviderWrapper from "@/components/utils/sessionProviderWrapper";
import { DatasetBasketProvider } from "@/providers/DatasetBasketProvider";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { latoFont } from "../utils/fonts";
import "./globals.css";
import { PublicEnvScript } from "next-runtime-env";
config.autoAddCss = false;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${latoFont.variable}`}>
      <head>
        <title>Health-RI - Nationale gezondheidsdatacatalogus</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <PublicEnvScript />
      </head>
      <body>
        <DatasetBasketProvider>
          <div className="grid h-screen w-screen grid-rows-[auto_1fr_auto]">
            <SessionProviderWrapper>
              <div>
                <Header />
              </div>
              <div>{children}</div>
              <div>
                <Disclaimer />
                <Footer />
              </div>
            </SessionProviderWrapper>
          </div>
        </DatasetBasketProvider>
      </body>
    </html>
  );
}
