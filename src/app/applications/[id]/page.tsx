// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0
"use client";

import Sidebar from "@/components/Sidebar";
import Button from "@/components/button";
import PageHeading from "@/components/pageHeading";
import { faPaperPlane, faSave } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import FieldAttachmentContainer from "./fieldAttachmentContainer";
import { createApplicationSidebarItems } from "./sidebarItems";

type ApplicationDetailsPageProps = {
  params: { id: string };
};

export default function ApplicationDetailsPage({
  params,
}: ApplicationDetailsPageProps) {
  const [files, setFiles] = useState<File[]>([]);
  const { id } = params;
  const sidebarItems = createApplicationSidebarItems();

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
                type="warning"
                text="Save changes"
                icon={faSave}
                disabled={files.length === 0}
                className="h-fit text-[10px] sm:text-xs"
              />
              <Button
                type="primary"
                text="Submit"
                className="h-fit text-[10px] sm:text-xs"
                icon={faPaperPlane}
                disabled={files.length === 0}
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

        <FieldAttachmentContainer
          fieldName="Field 1"
          files={files}
          setFiles={setFiles}
        />
      </form>

      <aside className="col-span-3 col-start-9 hidden xl:block">
        <Sidebar items={sidebarItems} />
      </aside>
    </div>
  );
}
