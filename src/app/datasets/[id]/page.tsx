// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0
import Chips from "@/components/Chips";
import PageContainer from "@/components/PageContainer";
import PageHeading from "@/components/PageHeading";
import PageSubHeading from "@/components/PageSubHeading";
import AddToBasketBtn from "./AddToBasketBtn";
import DistributionAccordion from "./DistributionAccordion";
import { createDatasetSidebarItems } from "./sidebarItems";
import { datasetGet } from "@/services/discovery";
import Sidebar from "@/components/Sidebar";
import Error from "@/app/error";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const dataset = await datasetGet(id);
    const sidebarItems = createDatasetSidebarItems(dataset);

    return (
      <PageContainer className="flex flex-col items-start justify-start lg:flex-row">
        <div className="flex w-full flex-col gap-5 lg:w-2/3 lg:px-5">
          <div className="flex w-full flex-col items-start justify-between lg:flex-row lg:items-center">
            <PageHeading className="mb-4 w-2/3 lg:mb-0">
              {dataset.title}
            </PageHeading>
            <AddToBasketBtn dataset={dataset} />
          </div>
          <p>{dataset.description}</p>
          {dataset.themes?.length > 0 && (
            <PageSubHeading>Themes</PageSubHeading>
          )}
          <Chips chips={dataset.themes.map((x) => x.label) || []} />
          {dataset.keywords?.length > 0 && (
            <PageSubHeading>Keywords</PageSubHeading>
          )}
          <Chips
            chips={dataset.keywords?.map((keyword) => keyword.label) || []}
          />
          {dataset.distributions.length > 0 && (
            <PageSubHeading>Distributions</PageSubHeading>
          )}
          <DistributionAccordion distributions={dataset.distributions || []} />
        </div>
        <aside className="w-full lg:w-1/3">
          <Sidebar items={sidebarItems} />
        </aside>
      </PageContainer>
    );
  } catch (error) {
    return <Error statusCode={404} />;
  }
}
