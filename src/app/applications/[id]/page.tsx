// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0
"use client";

import Button from "@/components/button";
import PageHeading from "@/components/pageHeading";
import Sidebar from "@/components/sidebar";
import { RetrievedApplication, State } from "@/types/application.types";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import FormContainer from "./formContainer";
import { createApplicationSidebarItems } from "./sidebarItems";

type ApplicationDetailsPageProps = {
  params: { id: string };
};

export default function ApplicationDetailsPage({
  params,
}: ApplicationDetailsPageProps) {
  const { id } = params;

  const [application, setApplication] = useState<RetrievedApplication>(
    {} as RetrievedApplication,
  );

  useEffect(() => {
    async function fetchApplication() {
      const response = await fetch(`/api/applications/${id}`);

      if (!response.ok) {
        console.error("Failed to fetch application", response.status);
        return;
      }
      const retrievedApplication = (await response.json()).body;
      setApplication(retrievedApplication);
    }
    fetchApplication();
  }, [id]);

  const events = application.events || [];
  const lastEvent = events[events.length - 1]?.eventType || "";
  const sidebarItems = createApplicationSidebarItems(application);

  function formatState(state: State) {
    if (!state) return "";

    const s = state.split("/")?.pop() || "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function isApplicationComplete(application: RetrievedApplication) {
    return application.forms
      .map((form) => form.fields)
      .flat()
      .every((field) => field.value?.split(",")?.length > 0);
  }

  function submitApplication() {
    fetch(`/api/applications/${id}/submit`, {
      method: "POST",
    });
  }

  return (
    <div className="mx-8 mt-20 md:mx-auto md:w-3/4 xl:mx-0 xl:grid xl:w-full xl:grid-cols-12 xl:gap-x-20">
      <div className="col-span-8 col-start-3 xl:col-span-6 xl:col-start-3">
        <div className="px-3">
          <div className="sm:flex sm:justify-between">
            <div className="flex items-center gap-x-4">
              <PageHeading>Application {application.id}</PageHeading>
              {application.id && (
                <div className="rounded bg-warning px-2.5 py-0.5 text-center text-sm font-semibold">
                  {formatState(application.state)}
                </div>
              )}
            </div>
            <div className="mt-4 flex gap-x-3 sm:mt-0">
              {(application.state === State.DRAFT ||
                application.state === State.RETURNED) && (
                <Button
                  type="primary"
                  text="Submit"
                  className="h-fit text-[10px] sm:text-xs"
                  icon={faPaperPlane}
                  disabled={!isApplicationComplete(application)}
                  onClick={submitApplication}
                />
              )}
            </div>
          </div>
          <p className="mt-5">Last Event: {lastEvent} </p>
        </div>

        <div className="mt-5 h-[2px] bg-secondary opacity-80"></div>

        <div className="mt-10 w-full xl:hidden">
          <Sidebar items={sidebarItems} />
        </div>

        <div className="mt-5 h-[2px] bg-secondary opacity-80 xl:hidden"></div>
        <ul>
          {application.forms &&
            application.forms.map((form) => (
              <li key={form.id}>
                <FormContainer
                  form={form}
                  application={application}
                  setApplication={setApplication}
                />
              </li>
            ))}
        </ul>
      </div>

      <aside className="col-span-3 col-start-9 hidden xl:block">
        <Sidebar items={sidebarItems} />
      </aside>
    </div>
  );
}
