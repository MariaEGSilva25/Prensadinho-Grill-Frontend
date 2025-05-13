import { TestBed } from '@angular/core/testing';

import { UtilsModalService } from './utils-modal.service';

describe('UtilsModalService', () => {
  let service: UtilsModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilsModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
