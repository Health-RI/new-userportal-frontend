// SPDX-FileCopyrightText: 2024 Stichting Health-RI
// SPDX-FileContributor: PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CkanService } from './ckan.service';

describe('CkanService', () => {
  let service: CkanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CkanService);
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CkanService],
    });

    service = TestBed.inject(CkanService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should send the correct parameters in the searchDatasets request', () => {
    const testQuery = 'search term';
    const testFilter = 'datasetType:test';
    const testStart = 10;
    const testRows = 5;

    const mockApiResponse = {
      result: {
        results: [
          {
            id: 'dataset1',
            title: 'Test Dataset 1',
            notes: 'This dataset is related to testing 1.',
            metadata_modified: '2023-01-01T00:00:00Z',
            organization: { title: 'Test Organization' },
            publisher_name: 'Test Publisher',
            tags: [{ name: 'tag1' }, { name: 'tag2' }],
            theme: ['"http://example.com/theme1"', '"http://example.com/theme2"'],
            resources: [{ format: 'CSV' }],
          },
          // ... more items as needed for testing ...
        ],
        count: 100, // the assumed total number of datasets matching the query
      },
    };

    const expectedMappedResults = [
      {
        id: 'dataset1',
        title: 'Test Dataset 1',
        description: 'This dataset is related to testing 1.',
        modified: '2023-01-01T00:00:00Z',
        organization: 'Test Organization',
        publisher_name: 'Test Publisher',
        tags: ['tag1', 'tag2'],
        theme: ['example.com/theme1', 'example.com/theme2'],
        format: 'csv',
      },
      // ... mapped accordingly ...
    ];

    // Perform the request
    service.searchDatasets(testQuery, testFilter, testStart, testRows).subscribe((response) => {
      // Check response data
      expect(response.results).toEqual(expectedMappedResults);
      expect(response.count).toBe(100);
    });

    // Expect one request with the correct URL and params
    const req = httpTestingController.expectOne(
      (req) =>
        req.method === 'GET' &&
        req.url === `${environment.backendUrl}/package_search` &&
        req.params.get('q') === testQuery &&
        req.params.get('fq') === testFilter &&
        req.params.get('start') === testStart.toString() &&
        req.params.get('rows') === testRows.toString(),
    );

    req.flush(mockApiResponse);
  });
});
