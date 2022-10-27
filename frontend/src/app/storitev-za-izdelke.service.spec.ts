import { TestBed } from '@angular/core/testing';

import { StoritevZaIzdelkeService } from './storitev-za-izdelke.service';

describe('StoritevZaIzdelkeService', () => {
  let service: StoritevZaIzdelkeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoritevZaIzdelkeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
