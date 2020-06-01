import { TestBed } from '@angular/core/testing';

import { ProviderregisterService } from './providerregister.service';

describe('ProviderregisterService', () => {
  let service: ProviderregisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProviderregisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
