import { TestBed } from '@angular/core/testing';

import { StoritevZaKosariceService } from './storitev-za-kosarice.service';

describe('StoritevZaKosariceService', () => {
  let service: StoritevZaKosariceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoritevZaKosariceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
