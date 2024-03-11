// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import PageHeading from "@/components/PageHeading";
import PageSubHeading from "@/components/PageSubHeading";
import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto  px-4 sm:px-2 lg:px-0">
      <div className="mb-8 text-center"></div>
      <PageHeading className="mb-4">Over Health-RI</PageHeading>
      <p>
        De missie van Health-RI is een betere gezondheid voor burgers en
        patiënten door hergebruik van gezondheids-data met een geïntegreerde
        gezondheidsdata-infrastructuur voor onderzoek, beleid en innovatie.
      </p>

      <PageSubHeading className="my-4">
        Nationale Gezondheidsdatacatalogus
      </PageSubHeading>
      <p>
        De nationale gezondheidsdatacatalogus is een belangrijk hulpmiddel voor
        het verzamelen, organiseren en delen van gezondheidsgerelateerde data op
        nationaal niveau. Het doel van deze catalogus is om een overzichtelijke
        en toegankelijke bron van informatie te creëren voor zorgprofessionals,
        onderzoekers, beleidsmakers en andere belanghebbenden.
      </p>

      {/* <PageSubHeading className="my-4">Key Objectives</PageSubHeading>
      <ul className="list-inside list-disc">
        <li>
          To link and to provide cross-border access to genomic and related
          phenotypic datasets across Europe
        </li>
        <li>
          To advance understanding of genomics for more precise and faster
          clinical decision making, diagnostics, treatments systems, and to
          benefit the overall economy
        </li>
        <li>
          To align with the development under the European Health Data Space
          (EHDS)
        </li>
        <li>
          To Facilitate research, policy-making, and healthcare improvements
        </li>
        <li>
          To maintain awareness, acceptance and trust in the main groups of
          stakeholders, notably European citizens, data holders, healthcare
          professionals, researchers and public health authorities
        </li>
      </ul> */}

      <p className="mt-20">
        Voor meer informatie, bezoek de{" "}
        <a
          href="https://www.health-ri.nl/"
          className="text-blue-500 hover:underline"
        >
          Health-RI Website
        </a>
        .
      </p>
      <p className="mt-4">
        Rapporteer problemen op{" "}
        <a
          href="https://github.com/Health-RI/new-userportal-frontend/issues"
          className="text-blue-500 hover:underline"
        >
          GitHub Issues
        </a>
        .
      </p>
      <PageSubHeading className="my-4">Ontwikkeling</PageSubHeading>
      <p>
        Deze portal is gebaseerd op de userportal die binnen het Genomic Data
        Infrastructure (GDI) project is mede-ontwikkeld door Health-RI en de{" "}
        <a href="https://lnds.lu" className="text-blue-500 hover:underline">
          Luxembourg National Data Service
        </a>
        . De broncode is beschikbaar onder de Apache 2.0 licentie op{" "}
        <a
          href="https://github.com/Health-RI/new-userportal-frontend/"
          className="text-blue-500 hover:underline"
        >
          Github
        </a>
      </p>
      <p className="mt-20">
        GDI project receives funding from the European Union's Digital Europe
        Programme under grant agreement number 101081813.
      </p>
    </div>
  );
};

export default AboutPage;
