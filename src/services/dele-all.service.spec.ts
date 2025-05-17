import { DeleteAllService } from './delete-all.service';
import { TestBed } from '@angular/core/testing';


describe('DeleteAllService', () => {
  let service: DeleteAllService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteAllService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
