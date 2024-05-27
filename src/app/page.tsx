// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

"use client";

import PageContainer from "@/components/PageContainer";
import SearchBar from "@/components/Searchbar";
import Image from "next/image";
import hri_banner from "../public/HRI_banner.jpg";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import dna from "../public/dna.jpg";
import office from "../public/office.jpg";
import { DatasetCounter } from "./DatasetCounter";
import { PortalStatistics } from "./PortalStatistics";

const HomePage = () => {
  const queryParams = useSearchParams();

  return (
    <PageContainer className="container mx-auto px-4 pt-5">
      <div className="grid gap-14 md:grid-cols-[2fr,1fr]">
        <div className="text-center md:pl-4 md:pr-4 lg:text-left">
          <DatasetCounter />
          <SearchBar queryParams={queryParams} size="large" />
          <div className="mx-auto mt-12 w-full rounded-lg bg-white transition-shadow duration-300 ease-in-out hover:shadow-sm lg:mx-0 lg:w-3/4">
            <h2 className="mb-4 text-4xl font-bold text-primary">
              Welkom bij Health-RI
            </h2>
            <p className="mb-6 text-lg">
              Welkom bij Health-RI, onze missie is een betere gezondheid voor
              burgers en patiënten door hergebruik van gezondheidsdata met een
              geïntegreerde gezondheidsdata-infrastructuur voor onderzoek,
              beleid en innovatie.
            </p>
            <p className="mb-6 text-lg">
              U kunt alvast kennis maken met de betaversie van de nationale
              gezondheidsdata catalogus. De nationale catalogus waarin u alle
              gezondheidsdata kunt gaan vinden voor onderzoek, beleid en
              innovatie.
            </p>
            <p className="mb-6 text-lg">
              Voor meer uitleg over deze catalogus, zie{" "}
              <a
                href="https://catalogus-test.healthdata.nl/about"
                className="text-blue-500 hover:underline"
              >
                Over de catalogus
              </a>
            </p>
            <p className="mb-6 text-lg">
              Voor meer informatie over Health-RI, zie{" "}
              <a
                href="https://www.health-ri.nl/"
                className="text-blue-500 hover:underline"
              >
                https://www.health-ri.nl/
              </a>
            </p>
            <p className="mb-6 text-lg">
              Voor informatie over het beschikbaar maken van datasets, zie{" "}
              <a
                href="https://health-ri.atlassian.net/wiki/spaces/FSD/pages/279150593/Metadata+onboarding+on+the+National+Catalogue"
                className="text-blue-500 hover:underline"
              >
                Metadata onboarding on the National Catalogue
              </a>
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
        <div className="flex items-center justify-center md:justify-end">
          <div className="w-full">
            <Image
              src={hri_banner}
              alt="Health-RI Visualization"
              className="rounded-lg object-cover"
              width={600}
              height={400}
            />
          </div>
        </div>
      </div>

      <div className="flex h-40 w-full justify-center">
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
            De nationale catalogus als onderdeel van de zorginfrastructuur
          </h2>
          <p className="text-lg">
            Door data-integratie en -analyse te stimuleren, streeft Health-RI
            naar verbetering van de gezondheidszorg, bevordering van medisch
            onderzoek en de ontwikkeling van gepersonaliseerde geneeskunde. Het
            biedt een infrastructuur voor veilige uitwisseling, harmonisatie en
            analyse van data, zodat onderzoekers toegang hebben tot diverse
            datasets. Door gezamenlijke inspanningen te bundelen, wil Health-RI
            de gezondheidszorg transformeren en bijdragen aan betere
            gezondheidsresultaten voor iedereen.
          </p>
          <p className="text-lg">
            Deze nationale gezondheidsdata catalogus is onderdeel van deze
            infrastructuur door beschikbare gezondheidsdata vindbaar te maken op
            een centraal punt. Vanuit hier kunnen wij verwijzen naar lokale
            en/of gespecialiseerde catalogi en databronnen.
          </p>
        </div>
      </div>

      <div className="mb-36 grid items-center gap-10 md:grid-cols-2">
        <div className="rounded-lg bg-white p-8 shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg">
          <h3 className="mb-4 text-2xl font-bold text-primary">De Data</h3>
          <p className="text-lg">
            Waar we data noemen, bedoelen we dit in de brede zin van het woord.
            De nationale gezondheidsdata catalogus is dus ook bedoeld om
            beelden, lichaamsmateriaal, klinische data, omics, etc. vindbaar te
            maken.
          </p>
          <p className="text-lg">
            De catalogus zelf bevat alleen de metadata over de data, die
            vindbaar is. Daarom kan er vrij in gezocht worden. Mogelijkheden om
            de data aan te vragen en koppelingen met applicaties om de data te
            analyseren zijn onderdeel van de doorontwikkeling.
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
    </PageContainer>
  );
};

export default HomePage;
