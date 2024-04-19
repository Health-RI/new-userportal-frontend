// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0
"use client";

import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/Button";
import { useDatasetBasket } from "@/providers/DatasetBasketProvider";
import { SearchedDataset } from "@/services/discovery/types/dataset.types";

type AddToBasketBtnProps = {
  dataset: SearchedDataset;
};

function AddToBasketBtn({ dataset }: AddToBasketBtnProps) {
  const { basket, addDatasetToBasket, removeDatasetFromBasket, isLoading } =
    useDatasetBasket();
  const isInBasket = basket.some((ds) => ds.id === dataset.id);
  const hasIdentifier = dataset.identifier != null;
  const toggleDatasetInBasket = () => {
    if (isInBasket) {
      removeDatasetFromBasket(dataset);
    } else if (hasIdentifier) {
      addDatasetToBasket(dataset);
    }
  };

  const buttonDisabled = isLoading || !hasIdentifier;

  return (
    <div className="flex lg:w-1/3 lg:justify-end">
      <Button
        text={isInBasket ? "Remove from basket" : "Add to basket"}
        icon={isInBasket ? faMinusCircle : faPlusCircle}
        onClick={toggleDatasetInBasket}
        type={isInBasket ? "warning" : "primary"}
        disabled={buttonDisabled}
      />
    </div>
  );
}

export default AddToBasketBtn;
