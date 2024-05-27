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
      <p className="mt-4">
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
      <p className="mt-4">
        GDI project receives funding from the European Union&lsquo;s Digital
        Europe Programme under grant agreement number 101081813.
      </p>

      <PageSubHeading className="my-4">Betaversie</PageSubHeading>
      <p>
        U kunt alvast kennis maken met de betaversie van de nationale
        gezondheidsdata catalogus. De nationale catalogus waarin u alle
        gezondheidsdata kunt gaan vinden voor onderzoek, beleid en innovatie.
        Doel is om zowel Real World Data uit zorgsystemen, als overige
        gezondheidsdata, van bijvoorbeeld prospectieve onderzoeken van uw
        collegae, vindbaar te maken in de nationale catalogus.
      </p>
      <p>
        Momenteel kunt u een beperkte hoeveelheid datasets vinden met een
        beperkte set aan variabelen waarop u deze zou kunnen filteren. Het plan
        is om:
      </p>
      <ul className="list-inside list-disc">
        <li>De gebruikersinterface te optimaliseren</li>
        <li>
          De hoeveelheid te vinden datasets, die te filteren zijn op de huidige
          beperkte set variabelen, uit te breiden
        </li>
        <li>
          De set gestandaardiseerde variabelen (metadata) uit te breiden,
          waarmee datasets te onderscheiden zijn.
        </li>
      </ul>
      <p>
        We zijn erg nieuwsgierig wat u van de betaversie vindt. Kunt u ons
        helpen om de nationale gezondheidsdata catalogus beter te maken door ons
        te voorzien van feedback via het e-mailadres{" "}
        <a
          href="mailto:servicedesk@health-ri.nl"
          className="text-blue-500 hover:underline"
        >
          servicedesk@health-ri.nl
        </a>
        , met kenmerk “#Feedback_Catalogus”. U kunt dit e-mailadres ook
        gebruikend om aan te geven dat u op de hoogte gehouden wenst te woorden
        met kenmerk “#Info_Catalogus”.
      </p>

      <PageSubHeading className="my-4">Achtergrondinformatie</PageSubHeading>
      <p>
        Momenteel is de catalogus in ontwikkeling. In deze betaversie worden
        pilots uitgevoerd, om metadata over datasets op te nemen volgens een
        minimale metadataset, gebaseerd op de in Europese portalen gehanteerde
        standaard DCAT AP. Deze DCAT AP standaard is in ontwikkeling, en veel
        aspecten zijn nog niet eenduidig beschreven. Dit geeft ruimte voor
        interpretatieverschillen aan beide zijden, waardoor veel afstemming
        nodig is om metadata in de juiste vorm aan de catalogus aan te bieden.
        Hierdoor ziet u momenteel nog geen, of een zeer beperkt aantal datasets
        in de catalogus.
      </p>
      <p>
        Tijdens de pilots wordt geschreven aan een eerste versie van informatie
        en handleidingen om metadata over datasets (in de brede zin van het
        woord, dus ook over samples, beelden, etc.) in de nationale
        gezondheidsdata catalogus te plaatsen. Een eerste versie van deze
        documentatie is in consultatie, zie:{" "}
        <a
          href="https://health-ri.atlassian.net/wiki/spaces/HWV3/pages/414126205/Onboarding+van+metadata+op+de+Nationale+Gezondheidsdata+Catalogus"
          className="text-blue-500 hover:underline"
        >
          Onboarding van metadata op de Nationale Gezondheidsdata Catalogus
        </a>
        .
      </p>

      <PageSubHeading className="my-4">Beoogde doorontwikkeling</PageSubHeading>
      <p>
        In de vervolgontwikkeling zal op basis van Health-DCAT de set aan
        metadata verder worden uitgebreid. Deze standaard wordt in september
        2024 gepubliceerd en zal leidend zijn voor de Health-Ring die bepaald
        wordt om gezondheidsdata op te nemen in de nationale catalogus.
      </p>
    </div>
  );
};

export default AboutPage;
