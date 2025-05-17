import { TestBed } from '@angular/core/testing';

import { DeleAllService } from './dele-all.service';

describe('DeleAllService', () => {
  let service: DeleAllService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleAllService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
