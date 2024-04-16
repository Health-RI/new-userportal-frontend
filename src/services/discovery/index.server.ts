// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0
import { makeDatasetCount } from './server/datasetCount';
import { makePortalStatistics } from './server/portalStatistics';

import serverConfig from '../../config/serverConfig';
import { makeDatasetGet } from './server/datasetGet';
import { makeDatasetList } from './server/datasetList';

const discoveryUrl = serverConfig.discoveryUrl;

const datasetCount = makeDatasetCount(discoveryUrl);
const datasetGet = makeDatasetGet(discoveryUrl);
const portalStatistics = makePortalStatistics(discoveryUrl);
const datasetList = makeDatasetList(discoveryUrl);

export { datasetCount, datasetGet, datasetList, portalStatistics };
