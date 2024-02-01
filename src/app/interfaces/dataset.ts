// SPDX-FileCopyrightText: 2024 Stichting Health-RI
// SPDX-FileContributor: PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

export interface PartialDataset {
  id: string;
  title: string;
  description: string;
  modified: Date;
  organization: string;
  publisher_name: string;
  tags: string[];
  theme: string[];
  format: string;
}
