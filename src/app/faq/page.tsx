// SPDX-FileCopyrightText: 2024 Stichting Health-RI
//
// SPDX-License-Identifier: Apache-2.0

import PageContainer from "@/components/PageContainer";
import PageHeading from "@/components/PageHeading";
import PageSubHeading from "@/components/PageSubHeading";
import React from "react";

const FAQPage: React.FC = () => {
  return (
    <PageContainer>
      <div className="container mx-auto  px-4 sm:px-2 lg:px-0">
        <PageHeading className="mb-4">Veelgestelde vragen</PageHeading>
        <p>
          We begrijpen dat er vele vragen zijn over de Nationale
          Gezondheidsdatacatalogus. Hieronder antwoord op de meest gestelde
          vragen.
        </p>

        <PageSubHeading className="my-4">
          Hoe kan ik mijn datasets aanmelden in de Nationale
          Gezondheidsdatacatalogus?
        </PageSubHeading>
        <p>
          Fijn dat u wilt bijdragen aan het bevorderen van datahergebruik!
          <br />
          Zie deze informatie voor hoe u kunt aansluiten:{" "}
          <a
            href="https://health-ri.atlassian.net/wiki/x/AYCjE"
            className="text-blue-500 hover:underline"
          >
            https://health-ri.atlassian.net/wiki/x/AYCjE
          </a>
        </p>

        <PageSubHeading className="my-4">
          Waarom zijn er nog maar zo weinig datasets in de Nationale
          Gezondheidsdatacatalogus?
        </PageSubHeading>
        <p>
          Health-RI werkt elke dag aan het <i>onboarden</i> van datasets. Op dit
          moment zijn wij bezig met het uitbouwen van de technische
          infrastructuur, zodat we complete categorieën data in een slag in de
          dataset kunnen zetten.
        </p>
        <PageSubHeading className="my-4">
          Hoe vraag ik een dataset aan voor hergebruik?
        </PageSubHeading>
        <p>
          Datasets kunnen worden aangevraagd door contact op te nemen met de
          datahouder, die vermeldt staat bij elke dataset. Mocht u problemen
          hiermee ondervinden, neem contact op met Health-RI.
        </p>
        <p>
          Op dit moment zijn wij bezig met het integreren van data-aanvraag
          functionaliteit in deze catalogus, om een <i>one-stop shop</i> te
          bieden voor alle aanvragen van gezondheidsdata voor secundair gebruik.
        </p>
        <PageSubHeading className="my-4">
          Als datahouder zie ik foutieve metadata in deze portaal. Hoe kan deze
          gecorrigeerd worden?
        </PageSubHeading>
        <p>
          Neemt u alstublieft contact op met Health-RI via{" "}
          <a
            href="mailto:datacatalogue@health-ri.nl"
            className="text-blue-500 hover:underline"
          >
            datacatalogue&#64;health-ri.nl
          </a>{" "}
          of via de{" "}
          <a
            href="https://www.health-ri.nl/health-ri-servicedesk"
            className="text-blue-500 hover:underline"
          >
            Servicedesk
          </a>
          .
        </p>
      </div>
    </PageContainer>
  );
};

export default FAQPage;
