// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import React, { useState, useRef, useEffect } from "react";
import { ListedApplication } from "@/types/application.types";
import {
  faChevronDown,
  faChevronUp,
  faDatabase,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDate } from "@/utils/formatDate";
import { getLabelName } from "@/utils/getLabelName";

export default function ApplicationItem({
  application,
  isExpanded,
}: {
  application: ListedApplication;
  isExpanded: boolean;
}) {
  const [collapsed, setCollapsed] = useState(!isExpanded);
  const toggleCollapsed = () => setCollapsed(!collapsed);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = collapsed
        ? "0px"
        : `${contentRef.current.scrollHeight}px`;
    }
  }, [collapsed]);

  return (
    <div className="flex w-full flex-col">
      <div className="w-full">
        <div
          className="flex w-full cursor-pointer items-center justify-between"
          onClick={toggleCollapsed}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              toggleCollapsed();
            }
          }}
        >
          <div className="flex items-center gap-4">
            <a
              href={`/applications/${application.id}`}
              className="text-primary hover:underline"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = `/applications/${application.id}`;
              }}
            >
              <h3 className="text-xl text-primary md:text-2xl">
                {application.title}
              </h3>
            </a>
            <div className="rounded bg-warning px-2.5 py-0.5 text-sm font-semibold">
              {application.currentState.split("/").pop()}
            </div>
          </div>
          <FontAwesomeIcon
            icon={collapsed ? faChevronDown : faChevronUp}
            className="text-sm"
          />
        </div>
      </div>

      <div
        ref={contentRef}
        className="transition-max-height overflow-hidden duration-500 ease-in-out"
      >
        <div className="mt-4 flex flex-col space-y-4 md:flex-row md:space-x-6 md:space-y-0">
          <div className="md:flex-1">
            <div className="mb-4">
              <h3 className="mb-1 text-lg font-semibold text-primary">
                Description
              </h3>
              <p className="text-md">
                {application.description || "No description available"}
              </p>
            </div>
            <div className="mb-4">
              <h3 className="mb-1 text-lg font-semibold text-primary">
                Created At
              </h3>
              <p className="text-md">{formatDate(application.createdAt)}</p>
            </div>
            <div>
              <h3 className="mb-1 text-lg font-semibold text-primary">
                State Modified At
              </h3>
              <p className="text-md">
                {formatDate(application.stateChangedAt)}
              </p>
            </div>
          </div>
          <div className="md:flex-1">
            <h3 className="mb-4 text-lg font-bold text-primary">Datasets</h3>
            {application.datasets.map((dataset) => (
              <a
                href={`/datasets/${dataset.externalId}`}
                key={dataset.id}
                className="mb-2 block flex items-baseline gap-2 hover:underline"
              >
                <FontAwesomeIcon
                  icon={faDatabase}
                  className="text-md text-info"
                />
                <h3 className="sm:text-md text-base font-bold text-info lg:text-lg">
                  {getLabelName(dataset.title)}
                </h3>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
