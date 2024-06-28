// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0
"use client";

import Alert, { AlertState } from "@/components/Alert";
import Button from "@/components/Button";
import ListContainer from "@/components/ListContainer";
import LoadingContainer from "@/components/LoadingContainer";
import PageContainer from "@/components/PageContainer";
import PageHeading from "@/components/PageHeading";
import { useDatasetBasket } from "@/providers/DatasetBasketProvider";
import { createApplication } from "@/services/daam/index.client";
import { faPaperPlane, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import DatasetList from "../../components/DatasetList";

export default function Page() {
  const { basket, isLoading, emptyBasket } = useDatasetBasket();
  const [alert, setAlert] = useState<AlertState | null>(null);
  const { data: session, status } = useSession();

  let heading = "Your Basket";
  if (basket.length > 0) {
    heading = `Your Basket (${basket.length})`;
  }

  if (isLoading || status === "loading") {
    return <LoadingContainer text="Loading your basket..." />;
  }

  const requestNow = async () => {
    const identifiers = basket
      .map((dataset) => dataset.identifier)
      .filter((identifier): identifier is string => identifier !== undefined);

    try {
      const response = await createApplication(identifiers);
      emptyBasket();
      window.location.href = `/applications/${response.data.applicationId}`;
    } catch (error) {
      setAlert({
        message: "Something went wrong. Please try again.",
        type: "error",
      });
    }
  };

  const onCloseAlert = () => {
    setAlert(null);
  };

  let actionBtn = null;

  if (basket.length > 0) {
    if (!session) {
      actionBtn = (
        <Button
          icon={faPaperPlane}
          text="Login to request"
          onClick={() => signIn("keycloak")}
          type="primary"
        />
      );
    } else {
      actionBtn = (
        <Button
          icon={faPaperPlane}
          text="Request now"
          type="primary"
          onClick={requestNow}
        />
      );
    }
  }

  return (
    <PageContainer>
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={onCloseAlert}
        />
      )}
      <PageHeading>{heading}</PageHeading>
      <ListContainer>
        <div className="flex w-full justify-between">
          {basket.length > 0 && (
            <Button
              icon={faPlusCircle}
              text="Continue adding"
              href="/datasets"
              type="info"
            />
          )}
          {actionBtn}
        </div>
        {basket.length > 0 ? (
          <DatasetList datasets={basket} />
        ) : (
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <p className="text-primary text-center text-lg">
              Your basket is empty.
            </p>
            <Button
              icon={faPlusCircle}
              text="Add datasets"
              href="/datasets"
              type="primary"
            />
          </div>
        )}
      </ListContainer>
    </PageContainer>
  );
}
