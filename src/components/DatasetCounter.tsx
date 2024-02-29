// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

"use client";

import React, { useState, useEffect } from 'react';
import { datasetCount } from '@/services/ckan/index.server';

const DatasetCounter = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchDatasetCount = async () => {
      try {
        const count = await datasetCount();
        console.log(count)
        setCount(count);
      } catch (error) {
        console.error('Error fetching dataset count:', error);
        setCount(0); // Fallback to 0 in case of an error
      }
    };

    fetchDatasetCount();
  }, []);

  return (
    <div className="mt-10 mb-4 flex items-baseline">
      {count !== null ? (
        <>
          <p className="text-4xl font-bold mr-3">{count.toLocaleString()}</p>
          <p className="text-xl font-bold self-end">Datasets</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DatasetCounter;
