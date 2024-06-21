// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0
"use client";

import Button from "@/components/Button";
import Chips from "@/components/Chips";
import { useWindowSize } from "@/hooks";
import { useDatasetBasket } from "@/providers/DatasetBasketProvider";
import { SearchedDataset } from "@/services/discovery/types/dataset.types";
import { formatDate } from "@/utils/formatDate";
import { truncateDescription } from "@/utils/textProcessing";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

type DatasetCardProps = {
  dataset: SearchedDataset;
  isEntitlement: boolean;
  start?: string;
  end?: string;
};

function DatasetCard({
  dataset,
  isEntitlement = false,
  start,
  end,
}: Readonly<DatasetCardProps>) {
  const screenSize = useWindowSize();
  const truncatedDesc = dataset.description
    ? truncateDescription(dataset.description, screenSize)
    : null;

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

  const hasIdentifier = !!dataset.identifier;
  const buttonDisabled = isLoading || !hasIdentifier;

  return (
    <>
      <div className="mb-4 flex justify-between">
        <Link href={`/datasets/${dataset.id}`} className="hover:underline">
          <h3 className="text-xl text-primary md:text-2xl">{dataset.title}</h3>
        </Link>
        {isEntitlement ? (
          <>
            <p className="font-date text-sm text-info md:text-base">
              <span className="text-primary">Start: </span>
              {!start ? "-" : formatDate(start)}
            </p>
            <p className="font-date text-sm text-info md:text-base">
              <span className="text-primary">End: </span>
              {!end ? "-" : formatDate(end)}
            </p>
          </>
        ) : (
          <p className="font-date text-sm text-info md:text-base">
            {formatDate(dataset.createdAt)}
          </p>
        )}
      </div>
      <p className="mb-4 text-sm text-info md:text-base">{dataset.catalogue}</p>
      {truncatedDesc && (
        <p className="mb-4 text-xs md:text-sm">{truncatedDesc}</p>
      )}
      <Chips chips={dataset.themes?.map((x) => x.label) || []} />
      <div
        className={
          "mt-4 flex w-full " +
          (!dataset.recordsCount ? "justify-end" : "justify-between")
        }
      >
        {!!dataset.recordsCount && (
          <span className="mt-4 flex rounded bg-info px-2 py-1 text-xs font-bold text-white">
            {dataset.recordsCount} record{dataset.recordsCount > 1 ? "s" : ""}{" "}
            found
          </span>
        )}
        {!isLoading && !isEntitlement && (
          <Button
            text={isInBasket ? "Remove from basket" : "Add to basket"}
            icon={isInBasket ? faMinusCircle : faPlusCircle}
            onClick={toggleDatasetInBasket}
            type={isInBasket ? "warning" : "primary"}
            disabled={buttonDisabled}
          />
        )}
      </div>
    </>
  );
}

export default DatasetCard;
