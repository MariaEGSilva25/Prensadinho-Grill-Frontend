import { TestBed } from '@angular/core/testing';

import { FiadoService } from './fiado.service';

describe('FiadoService', () => {
  let service: FiadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
