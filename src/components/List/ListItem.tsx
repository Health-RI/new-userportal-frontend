// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0
import { cn } from "@/utils/tailwindMerge";
import React from "react";

interface ListItemProps {
  children: React.ReactNode;
  className?: string;
}

function ListItem({ children, className }: ListItemProps) {
  return (
    <li
      className={cn(
        "bg-white-smoke break-words rounded-lg border p-8",
        className,
      )}
    >
      {children}
    </li>
  );
}

export default ListItem;
