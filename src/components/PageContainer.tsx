// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

"use client";

import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={`container mx-auto space-y-10 px-4 pt-20 ${className}`}>
      {children}
    </div>
  );
}

export default PageContainer;
