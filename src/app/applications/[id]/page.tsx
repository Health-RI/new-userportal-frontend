// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

"use client";

import Button from "@/components/Button";
import PageContainer from "@/components/PageContainer";
import PageHeading from "@/components/PageHeading";
import Sidebar from "@/components/Sidebar";
import { useApplicationDetails } from "@/providers/application/ApplicationProvider";
import { State } from "@/types/application.types";
import {
  formatApplicationState,
  isApplicationComplete,
} from "@/utils/application";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import FormContainer from "./FormContainer";
import { createApplicationSidebarItems } from "./sidebarItems";

export default function ApplicationDetailsPage() {
  const { application, submitApplication } = useApplicationDetails();

  if (!application) return;

  const events = application.events;
  const lastEvent = events[events.length - 1].eventType;
  const sidebarItems = createApplicationSidebarItems(application);

  return (
    <PageContainer className="xl:grid xl:grid-cols-12 xl:grid-rows-2 xl:gap-x-20">
      <div className="xl:grid-span-1 xl:col-span-9">
        <div className="sm:flex sm:justify-between">
          <div className="flex items-center gap-x-4">
            <PageHeading>Application {application.id}</PageHeading>
            {application.id && (
              <div className="rounded bg-warning px-2.5 py-0.5 text-center text-sm font-semibold">
                {formatApplicationState(application.state)}
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
        <p className="row-span-1 mt-5 xl:row-start-1">
          Last Event: {lastEvent}
        </p>
      </div>
      <div className="xl:col-span-9 xl:row-start-2">
        <div className="h-[2px] bg-secondary opacity-80"></div>

        <div className="mt-10 w-full xl:hidden">
          <Sidebar items={sidebarItems} />
        </div>

        <div className="mt-5 h-[2px] bg-secondary opacity-80 xl:hidden"></div>
        <ul>
          {application.forms.map(
            (form) =>
              form && (
                <li key={form.id}>
                  <FormContainer form={form} />
                </li>
              ),
          )}
        </ul>
      </div>

      <aside className="col-span-3 col-start-10 hidden xl:row-start-2 xl:block">
        <Sidebar items={sidebarItems} />
      </aside>
    </PageContainer>
  );
}
