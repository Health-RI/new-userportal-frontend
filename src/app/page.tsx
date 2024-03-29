// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

"use client";

import SearchBar from "@/components/searchBar";
import Image from "next/image";
import office from "../public/office.jpg";
import dna from "../public/dna.jpg";
import hri_banner from "../public/HRI_banner.jpg";
import Link from "next/link";
import { DatasetCounter } from "./datasetCounter";
import { PortalStatistics } from "./portalStatistics";

const HomePage = () => {
  const initialQueryParams: Record<string, string> = {
    q: "",
  };

  return (
    <div className="container mx-auto space-y-20 px-4 pt-20">
      <div className="mb-20 grid gap-10 md:grid-cols-[2fr,1fr]">
        <div className="text-center lg:text-left">
          <DatasetCounter />
          <SearchBar queryParams={initialQueryParams} size="large" />
          <div className="mx-auto mt-12 w-full rounded-lg bg-white transition-shadow duration-300 ease-in-out hover:shadow-sm lg:mx-0 lg:w-1/2">
            <h2 className="mb-4 text-4xl font-bold text-primary">
              Welkom bij Health-RI
            </h2>
            <p className="mb-6 text-lg">
              Betere gezondheid voor burgers en patiënten door hergebruik van
              gezondheidsdata met een geïntegreerde
              gezondheidsdata-infrastructuur voor onderzoek, beleid en
              innovatie.
            </p>
            <div className="flex justify-center lg:justify-start">
              <Link href="/datasets">
                <button className="inline-block rounded bg-primary px-4 py-2 font-bold text-white transition-colors duration-300 hover:bg-secondary">
                  Ontdek datasets
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <div className="w-full">
            <Image
              src={hri_banner}
              alt="Health-RI Visualization"
              className="rounded-lg"
              width={600}
              height={400}
            />
          </div>
        </div>
      </div>

      <div className="flex w-full justify-center">
        <PortalStatistics />
      </div>

      <div className="mb-36 grid items-center gap-10 md:grid-cols-2">
        <div className="relative order-2 flex h-full items-center justify-center md:order-1">
          <Image
            src={office}
            alt="Office"
            className="rounded-lg transition-shadow duration-300 ease-in-out hover:shadow-lg"
          />
        </div>
        <div className="order-1 rounded-lg bg-white p-8 shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg md:order-2">
          <h2 className="mb-4 text-3xl font-bold text-primary">
            What are the benefits?
          </h2>
          <p className="text-lg">
            Insights from the data will support improved clinical diagnostics,
            treatments, and predictive medicine for European citizens. The
            project will also lead to better public health measures to benefit
            citizens, healthcare systems, and the economy.
          </p>
        </div>
      </div>

      <div className="mb-36 grid items-center gap-10 md:grid-cols-2">
        <div className="rounded-lg bg-white p-8 shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg">
          <h3 className="mb-4 text-2xl font-bold text-primary">The Data</h3>
          <p className="text-lg">
            The project involves human genomic and related phenotypic and
            clinical data held in databases across Europe. Real synthetic data
            will be used for validation before data are available through the
            infrastructure.
          </p>
        </div>
        <div className="relative flex h-full items-center justify-center">
          <Image
            src={dna}
            alt="Data representation"
            className="rounded-lg transition-shadow duration-300 ease-in-out hover:shadow-lg"
          />
        </div>
      </div>

      <div className="mb-36 rounded-xl border bg-primary p-8 text-white">
        <div className="container mx-auto flex flex-wrap items-center justify-between md:flex-nowrap">
          <h2 className="mb-6 text-2xl font-bold text-warning md:mb-0 md:text-3xl lg:text-4xl">
            DOE MEE
          </h2>
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <div className="flex w-full flex-wrap justify-around text-warning">
              <a
                href="https://www.health-ri.nl/
                "
                target="_blank"
                rel="noopener noreferrer"
                className="mr-2 rounded border border-warning px-4 py-2 transition duration-300 ease-in-out md:mr-4 md:px-6 md:py-3 lg:mr-5"
              >
                Kom meer te weten over Health-RI
              </a>
              <a
                href="/subscribe-newsletter"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-warning px-4 py-2 transition duration-300 ease-in-out md:px-6 md:py-3"
              >
                Meld je aan voor de nieuwsbrief
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
