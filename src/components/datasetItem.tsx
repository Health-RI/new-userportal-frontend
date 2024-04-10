// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0
"use client";

import { useWindowSize } from "@/hooks";
import { truncateDescription } from "@/utils/textProcessing";
import Link from "next/link";
import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/button";
import Chips from "./Chips";
import { Dataset } from "@/types/dataset.types";
import { useDatasetBasket } from "@/providers/DatasetBasketProvider";

type DatasetItemProps = {
  dataset: Dataset;
};

function DatasetItem({ dataset }: DatasetItemProps) {
  const { width: screenWidth } = useWindowSize();
  const truncatedDesc = truncateDescription(dataset.notes, screenWidth);
  const { basket, addDatasetToBasket, removeDatasetFromBasket, isLoading } =
    useDatasetBasket();
  const isInBasket = basket.some((ds) => ds.id === dataset.id);
  const toggleDatasetInBasket = () => {
    if (isInBasket) {
      removeDatasetFromBasket(dataset);
    } else {
      addDatasetToBasket(dataset);
    }
  };

  return (
    <>
      <Link href={`/datasets/${dataset.id}`} className="hover:underline">
        <div className="mb-4 flex justify-between">
          <h3 className="text-xl text-primary md:text-2xl">{dataset.title}</h3>
          <p className="text-sm text-info md:text-base">
            {dataset.metadataCreated?.split("T")[0]}
          </p>
        </div>
      </Link>
      <p className="mb-4 text-sm text-info md:text-base">
        {dataset.organization.title}
      </p>
      <p className="mb-4 text-xs md:text-sm">{truncatedDesc}</p>
      <Chips chips={dataset.theme || []} />
      <div className="mt-4 flex w-full justify-end">
        {!isLoading && (
          <Button
            text={isInBasket ? "Remove from basket" : "Add to basket"}
            icon={isInBasket ? faMinusCircle : faPlusCircle}
            onClick={toggleDatasetInBasket}
            type={isInBasket ? "warning" : "primary"}
          />
        )}
      </div>
    </>
  );
}

export default DatasetItem;
