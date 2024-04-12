// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0
import { makeDatasetCount } from './datasetCount';
import { makePortalStatistics } from './portalStatistics';

import serverConfig from '../../config/serverConfig';
import { makeDatasetGet } from './datasetGet';
import { makeDatasetList } from './datasetList';

const discoveryUrl = serverConfig.discoveryUrl;

const datasetCount = makeDatasetCount(discoveryUrl);
const datasetGet = makeDatasetGet(discoveryUrl);
const portalStatistics = makePortalStatistics(discoveryUrl);
const datasetList = makeDatasetList(discoveryUrl);

export { datasetCount, datasetGet, datasetList, portalStatistics };
