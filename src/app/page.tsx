// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

"use client";

import { DatasetCounter } from "@/components/DatasetCounter";
import { Search } from "@/components/Search"
import { PortalStatistics } from "@/components/PortalStatistics";
import { OrganizationList } from "@/components/OrganizationList";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../public/gdi_logo.png";
import data from "../public/data-matters.jpg";
import dna from "../public/dna.jpg";
import gdi_visuals from "../public/gdi_visuals.png"
import Link from 'next/link';

const HomePage = () => {
  const router = useRouter();

  return (
      <div className="container mx-auto space-y-20 px-4 pt-20">
        <div className="mb-20 grid gap-10 md:grid-cols-[2fr,1fr]">
          <div className="text-center lg:text-left">
            <DatasetCounter />
            <Search />
            <div className="mt-12 w-full lg:w-1/2 mx-auto lg:mx-0 rounded-lg bg-white transition-shadow duration-300 ease-in-out hover:shadow-sm">
              <h2 className="mb-4 text-4xl font-bold text-primary">
                WELCOME TO GDI
              </h2>
              <p className="mb-6 text-lg">
                The Genomic Data Infrastructure (GDI) project is enabling access
                to genomic and related phenotypic and clinical data across Europe.
              </p>
              <div className="flex justify-center lg:justify-start">
              <Link href="/datasets">
                <button
                  className="inline-block rounded bg-primary px-4 py-2 font-bold text-white transition-colors duration-300 hover:bg-secondary"
                >
                  Discover GDI datasets
                </button>
              </Link>
              </div>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-[600px]">
              <Image
                src={gdi_visuals}
                alt="GDI Visualization"
                width={600}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>
      </div>

      <div className="w-full flex justify-center">
            <PortalStatistics />
      </div>

      <div className="mb-36 grid gap-10 md:grid-cols-2 items-center">
        <div className="order-2 md:order-1 flex justify-center items-center relative h-full">
          <Image
            src={data}
            alt="DNA visualization"
            className="rounded-lg transition-shadow duration-300 ease-in-out hover:shadow-lg"
          />
        </div>
        <div className="order-1 md:order-2 rounded-lg bg-white p-8 shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg">
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

      <div className="mb-36 grid gap-10 md:grid-cols-2 items-center">
        <div className="rounded-lg bg-white p-8 shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg">
          <h3 className="mb-4 text-2xl font-bold text-primary">The Data</h3>
          <p className="text-lg">
            The project involves human genomic and related phenotypic and
            clinical data held in databases across Europe. "Real" synthetic data
            will be used for validation before data are available through the
            infrastructure.
          </p>
        </div>
        <div className="flex justify-center items-center relative h-full">
          <Image
            src={dna}
            alt="Data representation"
            className="rounded-lg transition-shadow duration-300 ease-in-out hover:shadow-lg"
          />
        </div>
      </div>

      <div className="mb-36 rounded-xl border bg-primary p-8 text-white">
            <div className="container mx-auto flex flex-wrap items-center justify-between md:flex-nowrap">
              <h2 className="text-2xl font-bold mb-6 md:mb-0 md:text-3xl lg:text-4xl text-warning">
                PARTICIPATE
              </h2>
              <div className="flex flex-1 flex-col items-center justify-center text-center">
                <div className="mb-4 flex flex-wrap justify-around w-full text-warning">
                  <a href="https://b1mg-project.eu/" target="_blank" rel="noopener noreferrer" className="mb-2 mr-2 md:mr-4 lg:mr-5 rounded border border-warning px-4 py-2 md:px-6 md:py-3 transition duration-300 ease-in-out">
                    Learn more about B1MG
                  </a>
                  <a href="https://gdi.onemilliongenomes.eu/" target="_blank" rel="noopener noreferrer" className="mb-2 rounded border border-warning px-4 py-2 md:px-6 md:py-3 transition duration-300 ease-in-out">
                    Learn more about GDI
                  </a>
                </div>
                <a href="/subscribe-newsletter" className="text-warning rounded border border-warning px-6 py-3 transition duration-300 ease-in-out hover:bg-warningg">
                  Subscribe to our Newsletter
                </a>
          </div>
        </div>
      </div>

      {/* <div className="w-full flex justify-center">
            <OrganizationList organizations = {[]}/>
      </div> */}

      <div className="my-12 flex flex-col md:flex-row items-center justify-between">
        <div className="md:flex-1 p-4">
          <h3 className="mb-4 text-3xl md:text-4xl font-bold text-primary leading-tight">
            Realising a vision for European healthcare
          </h3>
          <p className="text-lg text-gray-700">
            The GDI project brings together experts in life science, medicine,
            computer science, ethics, and law.
          </p>
        </div>
        <div className="md:flex-1 p-4 flex justify-center md:justify-end">
          <div className="h-64 w-64 flex items-center justify-center overflow-hidden bg-white transition-transform duration-500 ease-in-out transform hover:scale-110">
            <Image
              src={logo}
              alt="GDI Logo"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
