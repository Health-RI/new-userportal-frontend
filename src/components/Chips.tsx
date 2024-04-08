// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

"use client";
import { cn } from "@/utils/tailwindMerge";
import React from "react";

interface ChipsProps {
  chips: string[];
  className?: string;
}

const Chips: React.FC<ChipsProps> = ({ chips, className }) => (
  <div className={`flex flex-row flex-wrap gap-3 break-all`}>
    {chips.map((chip, index) => (
      <div
        key={index}
        className={cn(
          "rounded bg-warning px-2.5 py-0.5 text-sm font-semibold",
          className,
        )}
      >
        {chip}
      </div>
    ))}
  </div>
);

export default Chips;
