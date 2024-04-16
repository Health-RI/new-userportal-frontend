// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { SidebarItem } from '@/components/sidebar';
import { RetrievedDataset } from '@/services/discovery/types/dataset.types';
import { formatDate } from '@/utils/formatDate';

function createDatasetSidebarItems(dataset: RetrievedDataset): SidebarItem[] {
  return [
    {
      label: 'Metadata Created',
      value: dataset.createdAt && formatDate(dataset.createdAt),
      isLink: false,
    },
    {
      label: 'Metadata Modified',
      value: dataset.modifiedAt && formatDate(dataset.modifiedAt),
      isLink: false,
    },
    {
      label: 'Source',
      value: {
        label: dataset.url,
        url: dataset.url,
      },
      isLink: true,
    },
    {
      label: 'Language',
      value: dataset.languages?.map((language) => ({ label: language.label, url: language.value })),
      isLink: true,
    },
    {
      label: 'Publisher Name',
      value: dataset.publisherName,
      isLink: false,
    },
    {
      label: 'Identifier',
      value: {
        label: dataset.identifier,
        url: dataset.identifier,
      },
      isLink: true,
    },
    {
      label: 'Spatial URI',
      value: {
        label: dataset.spatial?.label,
        url: dataset.spatial?.value,
      },
      isLink: true,
    },
    {
      label: 'Has Version',
      value: dataset.hasVersions?.map((version) => ({ label: version.label, url: version.value })),
      isLink: false,
    },
    {
      label: 'Contact URI',
      value: dataset.contact?.value,
      isLink: false,
    },
    {
      label: 'Access rights',
      value: dataset.accessRigths?.map((accessRight) => ({ label: accessRight.label, url: accessRight.value })),
      isLink: false,
    },
    {
      label: 'Conforms to',
      value: dataset.conformsTo?.map((conform) => ({ label: conform.label, url: conform.value })),
      isLink: false,
    },
    {
      label: 'Provenance',
      value: dataset.provenance,
      isLink: false,
    },
  ];
}

export { createDatasetSidebarItems };
