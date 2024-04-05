// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { makeDatasetCount } from './datasetCount';
import { makePortalStatistics } from './portalStatistics';

import serverConfig from '../../config/serverConfig';
import { makeDatasetGet } from './datasetGet';
import { makeDatasetList } from './datasetList';

const DDS_URL = serverConfig.ddsUrl;

const datasetCount = makeDatasetCount(DDS_URL);



const datasetList = makeDatasetList(DDS_URL);
const datasetGet = makeDatasetGet(DDS_URL);
const portalStatistics = makePortalStatistics(DDS_URL);

export { datasetCount, datasetGet, datasetList, portalStatistics };


// dataset count -> dataset search endpoint 

