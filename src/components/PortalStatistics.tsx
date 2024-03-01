// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { portalStatistics } from "@/services/ckan/index.server";

export async function PortalStatistics() {
  const propCounters = await portalStatistics();

  return (
    <div className="mt-4 px-4">
      <div className="grid grid-cols-2 gap-32 sm:grid-cols-3 md:grid-cols-4">
        {Object.entries(propCounters).map(([key, value]) => (
          <div
            key={key}
            className="transform transition duration-500 ease-in-out hover:scale-105"
          >
            <div className="cursor-pointer rounded-lg bg-white p-4 text-center shadow-md hover:shadow-xl">
              <div className="text-2xl font-semibold hover:text-info">
                {value.toLocaleString("en-GB")}
              </div>
              <div className="text-md mt-2 hover:text-info">{key}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
