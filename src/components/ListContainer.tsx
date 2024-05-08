// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

"use client";

import React from "react";

interface CenteredListContainerProps {
  children: React.ReactNode;
  className?: string;
}

function ListContainer({ children, className }: CenteredListContainerProps) {
  return (
    <div className={`mt-8 flex w-full flex-col gap-4 ${className}`}>
      {children}
    </div>
  );
}

export default ListContainer;
