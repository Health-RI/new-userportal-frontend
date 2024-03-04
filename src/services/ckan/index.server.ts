// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { makeDatasetList } from './datasetList';
import { makeDatasetGet } from './datasetGet';
import { makeDatasetCount } from './datasetCount';
import { makePortalStatistics } from './portalStatistics';
import { makeOrganizationList } from './organizationList';

import serverConfig from '../../config/serverConfig';

const DMS_URL = serverConfig.ckanUrl;
const datasetList = makeDatasetList(DMS_URL);
const datasetGet = makeDatasetGet(DMS_URL);
const datasetCount = makeDatasetCount(DMS_URL);
const portalStatistics = makePortalStatistics(DMS_URL);
const organizationList = makeOrganizationList(DMS_URL);

export { datasetList, datasetGet, datasetCount, portalStatistics, organizationList};
