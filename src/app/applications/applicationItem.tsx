// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { ListedApplication } from "@/types/application.types";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function ApplicationItem({
  application,
  collapsable,
}: {
  application: ListedApplication;
  collapsable: boolean;
}) {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => setCollapsed(!collapsed);

  return collapsable && collapsed ? (
    <button
      className="mt-4 flex w-5/6 cursor-pointer items-center justify-between rounded-lg border-2 bg-white-smoke p-4"
      onClick={toggleCollapsed}
    >
      <div></div>
      <span className="text-xl text-primary">
        Application Id: {application.id}
      </span>
      <FontAwesomeIcon
        icon={collapsed ? faChevronDown : faChevronUp}
        className="text-sm"
      />
    </button>
  ) : (
    <div className="mt-4 w-5/6 rounded-lg border-2 bg-white-smoke">
      <div className="flex flex-col items-center">
        <button
          className="flex w-full cursor-pointer items-center justify-between rounded-lg bg-white-smoke p-4"
          onClick={toggleCollapsed}
        >
          <div></div>
          <span className="text-xl text-primary">
            Application Id: {application.id}
          </span>
          {collapsable ? (
            <FontAwesomeIcon
              icon={collapsed ? faChevronDown : faChevronUp}
              className="text-sm"
            />
          ) : (
            <div></div>
          )}
        </button>
        <span className="text-xl">Title: {application.title}</span>
      </div>

      <div className="flex justify-center gap-10 p-6">
        <span className="px-2">State: {application.currentState}</span>
        <span className="px-2">
          State Modified: {application.stateChangedAt?.split("T")[0]}
        </span>
      </div>
    </div>
  );
}
