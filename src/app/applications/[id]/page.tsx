// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0
"use client";

import Button from "@/components/button";
import PageHeading from "@/components/pageHeading";
import Sidebar from "@/components/sidebar";
import { RetrievedApplication } from "@/types/application.types";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { createApplicationSidebarItems } from "./sidebarItems";

type ApplicationDetailsPageProps = {
  params: { id: string };
};

export default function ApplicationDetailsPage({
  params,
}: ApplicationDetailsPageProps) {
  const [application, setApplication] = useState<RetrievedApplication>(
    {} as RetrievedApplication,
  );

  const { id } = params;

  useEffect(() => {
    async function getApplication() {
      const response = await fetch(`/api/applications/${id}`);

      // if (!response.ok) {
      //   return "Error fetching data";
      // }
      // const application = await response.json();
      console.log(response.body);
      // return application;
    }

    getApplication();
    console.log(application);
  }, [application, id]);

  const sidebarItems = createApplicationSidebarItems(application);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div className="mx-8 mt-20 md:mx-auto md:w-3/4 xl:mx-0 xl:grid xl:w-full xl:grid-cols-12 xl:gap-x-20">
      <form
        onSubmit={onSubmit}
        className="col-span-8 col-start-3 xl:col-span-6 xl:col-start-3"
      >
        <div className="px-3">
          <div className="sm:flex sm:justify-between">
            <PageHeading>Application {id}</PageHeading>
            <div className="mt-4 flex gap-x-3 sm:mt-0">
              <Button
                type="primary"
                text="Submit"
                className="h-fit text-[10px] sm:text-xs"
                icon={faPaperPlane}
                disabled={[].length === 0}
                // onClick={() => submitApplication(id))}
              />
            </div>
          </div>
          <p className="mt-5">Last Event: blablabla</p>
        </div>

        <div className="mt-5 h-[2px] bg-secondary opacity-80"></div>

        <div className="mt-10 w-full xl:hidden">
          <Sidebar items={sidebarItems} />
        </div>

        <div className="mt-5 h-[2px] bg-secondary opacity-80 xl:hidden"></div>

        {/* {application.forms.map((form) => (
          <FormContainer form={form} key={form.id} />
        ))} */}
      </form>

      <aside className="col-span-3 col-start-9 hidden xl:block">
        <Sidebar items={sidebarItems} />
      </aside>
    </div>
  );
}
