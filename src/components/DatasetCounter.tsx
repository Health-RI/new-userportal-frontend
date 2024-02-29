// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

"use client";

import React, { useState, useEffect } from "react";
import { datasetCount } from "@/services/ckan/index.server";

const DatasetCounter = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchDatasetCount = async () => {
      try {
        const count = await datasetCount();
        console.log(count);
        setCount(count);
      } catch (error) {
        console.error("Error fetching dataset count:", error);
        setCount(0); // Fallback to 0 in case of an error
      }
    };

    fetchDatasetCount();
  }, []);

  return (
    <div className="mb-4 mt-10 flex items-baseline">
      {count !== null ? (
        <>
          <p className="mr-3 text-4xl font-bold">{count.toLocaleString()}</p>
          <p className="self-end text-xl font-bold">Datasets</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DatasetCounter;
