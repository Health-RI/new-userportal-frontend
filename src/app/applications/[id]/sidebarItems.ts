// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { SidebarItem } from '@/components/Sidebar';
import { RetrievedApplication } from '@/types/application.types';
import { formatApplicationProp } from '@/utils/application';
import { formatDateTime } from '@/utils/formatDate';

function createApplicationSidebarItems(application: RetrievedApplication): SidebarItem[] {
  const { datasets, applicant, events } = application;

  return [
    {
      label: 'Datasets',
      value: datasets.map((dataset) => dataset.title?.[0]?.name),
      isLink: false,
    },
    {
      label: 'Participants',
      value: applicant.name,
      isLink: false,
    },
    {
      label: 'Events',
      value: events.map((event) => `${formatApplicationProp(event?.eventType)} at ${formatDateTime(event.eventTime.toString())}`),
      isLink: false,
    },
  ];
}

export { createApplicationSidebarItems };
