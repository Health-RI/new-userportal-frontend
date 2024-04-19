// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { SidebarItem } from '@/components/Sidebar';
import { RetrievedApplication } from '@/types/application.types';
import { formatDate } from '@/utils/formatDate';

function createApplicationSidebarItems(application: RetrievedApplication): SidebarItem[] {
  const { datasets, applicant, events } = application;

  function formatEventDate(date: Date) {
    const formattedDate = formatDate(date.toString());
    const time = new Date(date).toLocaleTimeString();
    return `${formattedDate} at ${time}`;
  }

  return [
    {
      label: 'Dataset',
      value: datasets?.map((dataset) => {
        return {
          label: dataset.title?.[0]?.name,
          url: `${window.location.origin}/datasets/${dataset?.url?.[0]?.name}`,
        };
      }),
      isLink: true,
    },
    {
      label: 'Participant',
      value: applicant?.name,
      isLink: false,
    },
    {
      label: 'Events',
      value: events?.map((event) => `${event?.eventType} (${formatEventDate(event?.eventTime)})`),
      isLink: false,
    },
  ];
}

export { createApplicationSidebarItems };
