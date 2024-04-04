// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { makeDatasetCount } from './datasetCount';
import { makePortalStatistics } from './portalStatistics';

import serverConfig from '../../config/serverConfig';
import { makeDatasetGet } from './datasetGet';
import { makeDatasetList } from './datasetList';

const DMS_URL = serverConfig.ckanUrl;

const datasetList = makeDatasetList(DMS_URL);
const datasetGet = makeDatasetGet(DMS_URL);
const datasetCount = makeDatasetCount(DMS_URL);
const portalStatistics = makePortalStatistics(DMS_URL);

export { datasetCount, datasetGet, datasetList, portalStatistics };
