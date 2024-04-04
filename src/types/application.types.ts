// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

export interface ListedApplication {
  id: number;
  title: string;
  description: string;
  currentState: string;
  stateChangedAt: string;
  createdAt: string;
  datasets: ApplicationDataset[];
}

export interface ApplicationDataset {
  id: number;
  title: string;
  url: string;
}
