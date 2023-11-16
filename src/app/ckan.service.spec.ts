import { TestBed } from '@angular/core/testing';

import { CkanService } from './ckan.service';

describe('CkanService', () => {
  let service: CkanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CkanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
