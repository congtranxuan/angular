import { TestBed } from '@angular/core/testing';

import { ServicerLoadService } from './servicer-load.service';

describe('ServicerLoadService', () => {
  let service: ServicerLoadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicerLoadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
