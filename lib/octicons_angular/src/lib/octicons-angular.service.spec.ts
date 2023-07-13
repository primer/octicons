import { TestBed } from '@angular/core/testing';

import { OcticonsAngularService } from './octicons-angular.service';

describe('OcticonsAngularService', () => {
  let service: OcticonsAngularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OcticonsAngularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
