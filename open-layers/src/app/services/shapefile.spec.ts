import { TestBed } from '@angular/core/testing';

import { Shapefile } from './shapefile';

describe('Shapefile', () => {
  let service: Shapefile;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Shapefile);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
