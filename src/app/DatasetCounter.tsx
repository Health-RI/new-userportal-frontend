// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0
"use client";
import { datasetCount } from "@/services/discovery/index.public";
import { useEffect, useState } from "react";

export function DatasetCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const count = await datasetCount();
      setCount(count);
    };

    fetchData();
  }, []);

  if (count === null) {
    return <div className="text-primary text-xl font-bold">Loading...</div>;
  }

  return (
    <div className="text-primary mb-4 mt-10 flex items-baseline">
      <p className="mr-3 text-4xl font-bold">{count.toLocaleString("en-GB")}</p>
      <p className="self-end text-xl font-bold">Datasets</p>
    </div>
  );
}
